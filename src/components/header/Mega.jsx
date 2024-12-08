import globalStore from "@/store/global";
import { useRouter } from "next/navigation";
import signUpStore from "@/store/signUp";

export default function Mega({ staticMenuClass }) {
  const { meta } = globalStore();
  const router = useRouter();
  const { loggedInUser } = signUpStore();

  const routeTo = (service) => {
    if (loggedInUser.userType === "CLIENT") {
      router.push(`/service-1?filter=${service.value}`);
    } else {
      router.push(`/project-1?filter=${service.value}`);
    }
  };

  return (
    <>
      {loggedInUser && (
        <div id="mega-menu">
          <a
            className={`btn-mega fw500 ${
              staticMenuClass ? staticMenuClass : ""
            } `}
          >
            <span
              className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${
                staticMenuClass ? staticMenuClass : ""
              } `}
            />
            Categories
          </a>
          <ul className="menu ps-0 categories-menu">
            {meta.services.map((service, index) => (
              <li key={index} onClick={() => routeTo(service)}>
                {/* <a className="dropdown"></a> */}
                <a>
                  <span className="menu-icn flaticon-developer" />
                  <span className="menu-title">{service.label}</span>
                </a>
                {/* <div className="drop-menu d-flex justify-content-between">
                <div className="one-third">
                  <div className="h6 cat-title">Web &amp; App Design</div>
                  <ul className="ps-0 mb40">
                    <li>
                      <Link href="/">Website Design</Link>
                    </li>
                    <li>
                      <Link href="/">App DesignUX Design</Link>
                    </li>
                    <li>
                      <Link href="/">Landing Page Design</Link>
                    </li>
                    <li>
                      <Link href="/">Icon Design</Link>
                    </li>
                  </ul>
                  <div className="h6 cat-title">Marketing Design</div>
                  <ul className="ps-0 mb-0">
                    <li>
                      <Link href="/">Social Media Design</Link>
                    </li>
                    <li>
                      <Link href="/">Email Design</Link>
                    </li>
                    <li>
                      <Link href="/">Web Banners</Link>
                    </li>
                    <li>
                      <Link href="/">Signage Design</Link>
                    </li>
                  </ul>
                </div>
                <div className="one-third">
                  <div className="h6 cat-title">Art &amp; Illustration</div>
                  <ul className="ps-0 mb40">
                    <li>
                      <Link href="/">Illustration</Link>
                    </li>
                    <li>
                      <Link href="/">NFT Art</Link>
                    </li>
                    <li>
                      <Link href="/">Pattern Design</Link>
                    </li>
                    <li>
                      <Link href="/">Portraits &amp; Caricatures</Link>
                    </li>
                    <li>
                      <Link href="/">Cartoons &amp; Comics</Link>
                    </li>
                    <li>
                      <Link href="/">Tattoo Design</Link>
                    </li>
                    <li>
                      <Link href="/">Storyboards</Link>
                    </li>
                  </ul>
                  <div className="h6 cat-title">Gaming</div>
                  <ul className="ps-0 mb-0">
                    <li>
                      <Link href="/">Game Art</Link>
                    </li>
                    <li>
                      <Link href="/">Graphics for Streamers</Link>
                    </li>
                    <li>
                      <Link href="/">Twitch Store</Link>
                    </li>
                  </ul>
                </div>
                <div className="one-third">
                  <div className="h6 cat-title">Visual Design</div>
                  <ul className="ps-0 mb40">
                    <li>
                      <Link href="/">Image Editing</Link>
                    </li>
                    <li>
                      <Link href="/">Presentation Design</Link>
                    </li>
                    <li>
                      <Link href="/">Infographic Design</Link>
                    </li>
                    <li>
                      <Link href="/">Vector Tracing</Link>
                    </li>
                    <li>
                      <Link href="/">Resume Design</Link>
                    </li>
                  </ul>
                  <div className="h6 cat-title">Print Design</div>
                  <ul className="ps-0 mb-0">
                    <li>
                      <Link href="/">T-Shirts &amp; Merchandise</Link>
                    </li>
                    <li>
                      <Link href="/">Flyer Design</Link>
                    </li>
                    <li>
                      <Link href="/">Brochure Design</Link>
                    </li>
                    <li>
                      <Link href="/">Poster Design</Link>
                    </li>
                    <li>
                      <Link href="/">Catalog Design</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
