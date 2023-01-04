import { normalizeOwnedCourse } from "@utils/normalize"
import { useWeb3 } from "providers/web3"
import useSWR from "swr"

const handler = (account) => {
    const { web3, contract } = useWeb3()

    const swrRes = useSWR(() =>
        (web3 && contract && account.isAdmin) ? `web3/managedCourse/${account.data}` : null,
        async () => {
            const courses = []
            const courseCount = await contract.methods.getCourseCount().call()

            for (let i = Number(courseCount) - 1; i >= 0; i--) {
                console.log(i)
                const courseHash = await contract.methods.getCourseHashAtIndex(i).call()
                const course = await contract.methods.getCourseByHash(courseHash).call()
                console.log(course)
                if (course) {
                    const normalized = normalizeOwnedCourse(web3)({ hash: courseHash }, course)
                    courses.push(normalized)
                }
            }
        
            return courses
        }
    )

    return swrRes
}


export const useManagedCourses = (account) => {
    const swrRes = handler(account)

    return {
        managedCourses: { swrRes }
    }
}