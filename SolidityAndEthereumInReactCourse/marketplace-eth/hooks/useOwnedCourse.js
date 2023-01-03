import { normalizeOwnedCourse } from "@utils/normalize"
import { useWeb3 } from "providers/web3"
import useSWR from "swr"

const handler = (course, account) => {
    const { web3, contract } = useWeb3()

    const swrRes = useSWR(() =>
        (web3 && contract && account) ? `web3/ownedCourse/${account}` : null,
        async () => {
            const hexCourseId = web3.utils.utf8ToHex(course.id)
            const courseHash = web3.utils.soliditySha3(
                { type: "bytes16", value: hexCourseId },
                { type: "address", value: account }
            )

            const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()
            if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
                return null
            }

            return normalizeOwnedCourse(web3)(course, ownedCourse)
        }
    )

    return swrRes
}


export const useOwnedCourse = (courses, account) => {
    const swrRes = handler(courses, account)

    return {
        ownedCourse: { swrRes }
    }
}