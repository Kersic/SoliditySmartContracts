import { useAccount } from "hooks/useAccount"
import { useRouter } from "next/router"
import { useWeb3 } from "providers/web3"
import Button from "./button"
import ActiveLink from "./activeLink";

export default function Navbar() {

  const { connect, isLoading, requireInstall } = useWeb3()
  const { account } = useAccount()
  const { pathname } = useRouter()

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div className="flex flex-col xs:flex-row justify-between items-center">
              <ActiveLink href="/"
                linkClass="font-medium mr-8">
                Home
              </ActiveLink>
              <ActiveLink href="/marketplace"
                linkClass="font-medium mr-8">
                Marketplace
              </ActiveLink>
              {/* <ActiveLink href="/blogs"
                linkClass="font-medium mr-8">
                Blogs
              </ActiveLink> */}
            </div>
            <div className="flex justify-center items-center">
              {/* <ActiveLink href="/wishlist"
                linkClass="font-medium sm:mr-8 mr-1 text-gray-500 hover:text-gray-900">
                Wishlist
              </ActiveLink> */}
              {isLoading ?
                <Button
                  disabled={true}
                  onClick={connect}>
                  Loading...
                </Button> :
                account.data ?
                  <Button
                    hoverable={false}
                    className="cursor-default">
                    Hi there {account.isAdmin && "Admin"}
                  </Button> :
                  requireInstall ?
                    <Button
                      onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                      Install Metamask
                    </Button> :
                    <Button
                      onClick={connect}>
                      Connect
                    </Button>
              }
            </div>
          </div>
        </nav>
      </div>
      {account.data &&
        !pathname.includes("/marketplace") &&
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      }
    </section>
  )
}