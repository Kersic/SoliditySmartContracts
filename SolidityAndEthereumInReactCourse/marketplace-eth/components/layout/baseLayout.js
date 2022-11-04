import Navbar from "@components/common/navbar";
import Footer from "@components/common/footer";

export default function BaseLayout({children}) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            {children}
          </div>
        </div>
        <Footer />
      </>
    )
  }