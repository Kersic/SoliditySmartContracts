import { normalizeOwnedCourse } from "@utils/normalize"
import { useWeb3 } from "providers/web3"
import useSWR from "swr"

const handler = (courses, account) => {
    const { web3, contract } = useWeb3()

    const swrRes = useSWR(() =>
        (web3 && contract && account) ? `web3/ownedCourses/${account}` : null,
        async () => {
            const ownedCourses = []

            for (let i = 0; i < courses.length; i++) {
                const course = courses[i]
                if (!course.id) { continue }

                const hexCourseId = web3.utils.utf8ToHex(course.id)
                const courseHash = web3.utils.soliditySha3(
                    { type: "bytes16", value: hexCourseId },
                    { type: "address", value: account }
                )

                const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()
                if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {
                    const normalized = normalizeOwnedCourse(web3)(course, ownedCourse)
                    ownedCourses.push(normalized)
                }
            }

            return ownedCourses
        }
    )

    return swrRes
}


export const useOwnedCourses = (courses, account) => {
    const swrRes = handler(courses, account)

    return {
        ownedCourses: { swrRes }
    }
}