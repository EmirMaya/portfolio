import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import styles from "./navbar.module.css";

export default function NavLink({ href, title, onClick, mobile = false, number }) {
  return (
    <Link className={styles.navLink} href={href} onClick={onClick}>
      {mobile && <span className={styles.linkNumber} aria-hidden="true">{String(number).padStart(2, "0")}</span>}
      <span className={styles.linkText}>{title}</span>
      {mobile && <ArrowUpRightIcon className={styles.linkArrow} aria-hidden="true" />}
    </Link>
  );
}
