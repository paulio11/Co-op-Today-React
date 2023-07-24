import React from "react";
import { Link, NavLink } from "react-router-dom";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Menu = (props) => {
  const { setShowMenu } = props;

  // Get firstname
  const [user] = useAuthState(auth);
  const firstName = user.displayName.split(" ")[0];

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
    });
  };

  return (
    <div className="sidebar-background" onClick={() => setShowMenu(false)}>
      <nav>
        <span className="close" onClick={() => setShowMenu(false)}>
          Close Menu <i className="far fa-circle-xmark"></i>
        </span>
        <h1>Hello {firstName}!</h1>
        <ul>
          <li>
            <NavLink to="/">Today</NavLink>
          </li>
          <li>
            <NavLink to="/calendar">Calendar</NavLink>
          </li>
          <li>
            <NavLink to="/dailytasks">Daily Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/todo">To Do List</NavLink>
          </li>
          <li>
            <NavLink to="/training">Training</NavLink>
          </li>
          <li>
            <NavLink to="/handovers">Handovers</NavLink>
          </li>
          <li>
            <NavLink to="/newstore">New Store</NavLink>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
        <ul className="side-menu-2">
          <li>
            <Link to="https://shifts.coop.co.uk/" target="_blank">
              Shifts
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://live.microlise.com/COOP/TMCWebPortal/authentication/login.aspx?ReturnUrl=%2fCOOP%2fTMCWebPortal%2fSite%2fVisits%2f35145%3fsiteIdEncoded%3dFalse&siteIdEncoded=False"
            >
              Delivery Time
            </Link>
          </li>
          <li>
            <Link
              to="https://eam.verisae.co.uk/DataNett/mobile/mlogin.html"
              target="_blank"
            >
              Verisae
            </Link>
          </li>
          <li>
            <Link to="https://how.coop.co.uk/" target="_blank">
              How Do I
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://hcnq.login.em2.oraclecloud.com/oam/server/obrareq.cgi?encquery%3DP34lA9BvhTl45Vn34Ha98yGDZ5M3JdWsj08D8nsyimwVG2sly8AVEdn7DfRRDL0DZf6RrcmTMCE5r0KYExMRm4ikoPc5%2Bq7yRdJ3fSEhKgmskYbATatHg1%2BUwNbZ9UAGo3Bfz8Iph8kpd1g8H926RB7WbfciZINB9ziy%2BzcfQFD0fLEqzzZv9puFjeoYaSst52tbVcG8V9YZBfHjcXdpxtcQ182Yi%2F5hrGep%2BLfADm1hZXytnU%2B0HphZJLsuZ2A2vokBP6KE9SlGV65QRZR7zjrq9TW2PHc7snQa6swDpl%2Fj5gmkfzbsIA52OIsEAnnB%2FvHFbz4Ap3yFltfhnGpQz4FW9XUmgAs2zgLIc2lf1C4QMLWnv4txX4KKlYa7x3MbtYEad1ezmHHf6sxoMZgaK74zt3UXD0HQSdLnXc668%2FA8UXiw9ieeTRNUozvMEkmIlczt%2ByzPaEKvlMeZR9awNXtCNYe6v%2BJz3ZvIuGKNg2NQq6HsGUsmYIhNJNqeNZN5HoHM7Jik6nCwj7APcFMP6pwWD6T1pzdoGwWQPQY%2FoFPNqPjbp17%2BOHcCJAV1kQ6Vqs5N2z6ZHdg8wyske1STGo4xogmDYb5VauIwHHYTpVXaWojVyEE%2FL9MTpX96VkOkjQqp37HaxDeIpPsyz1tX9EfQOfN0%2FpcSbKdp9YYsNeVlPHubDDnz6La5TODiQ40nCwTrUSoGQteKAlbg0CvVmmt6%2FmxfiPeRMkAek62ynsiRRM7yCUUDLjFp18mnBC0698k1rstcMGzlELWGVMj3rfpbCh23mgubMP%2BVhqdHaFspOVd%2Fvifd573%2Fv%2FLwt4OSXqKqqfMQMiVx2yUNrbAn%2FUorR0jIh1QuKNhZ2XNGfzaj1Z6AIYTc1V6MhONqTtdmnu9x69iV20zfV8AjKiWCTMdFqt%2Fq0%2FFi7q1sf1lozddDu92rUglPfnNWwPBcJJdf5PFBSdp6%2BN2ToHmIUcEm8P%2BYmTRjwbPJepM9lnf0NYCsaBpWrYav2HxXCanVOBOFdEgf0yomWsAd%2BBBVcPGgVWVgA%2FenpxnwtjgTbY%2BOjaKPDuUmu%2Fa7aJ2%2FRpl3Xh6bS9XsTTnH%2BLQVy7i6Q5TJBkHSb5tED9RoDlFrHSN6j1luDB%2Fq%2BEAyUEHfuux50hB85lVQtvMIESoOMwUIgLDA66cSYydxShN4PMC2eaWNQ77RH3I7EY17A1XECbNc%2BSP%2BpLslzUOQvcf2dYc5%2BLfxm1roqt8U3zTHN9Ez3%2B5WBsXVNt9t0RDasXLsDEY2%2F%2Fn%2B05NFP%2FGy4zIdsTi2l2hig7omAp5HHcFUSlcn3nkPFYnnTej7S%2BQf6Iiya6%2BozECh5Ws9qF4dFFBZ3nwVB0n8jphTBxKRPExaI244%2F77H1dnx6kBvanhr25dIiXHE0e2y9v5t8G2j3Ftlo1S4FHnxvctKj1K2o44A9MF%2BSlI2nbXhSihhW1txOU5KOzvwUpyHbty2XpTi7piOy84lnbJBNWj8yu%2FLbgiN0Ys2f%2B8N%2Bd3HMsZWVWtd8b7SJAxCUGmtdxZRHXvZKkAZ7JtLNJv9icbfQtWiRtQXajw2cA5m305rJSzfC%2FA85QCrqpn3XNTMfcWfuKsoFLlFJuWLZ6ueh%2Be52LSyx%2B%2FHDOI1VktZUW9q0ZJ6VuNCgOLQV2x7E%2Bf4%20agentid%3DOraFusionApp_11AG%20ver%3D1%20crmethod%3D2%26cksum%3D68f845d292f4de0d161606fd1751cf04f62a47e2&ECID-Context=1.005zwDsTTqn7e575vJ8DyX0001%5Eb000MxU%3BkXjE"
            >
              My HR
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
