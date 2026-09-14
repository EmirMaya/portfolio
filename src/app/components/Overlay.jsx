import NavLink from "./NavLink";
import styles from "./navbar.module.css";

export default function Overlay({ id, links, isOpen, onNavigate }) {
  return (
    <div
      id={id}
      className={styles.mobileMenu}
      data-open={isOpen}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className={styles.menuClip}>
        <div className={`container mx-auto ${styles.menuContent}`}>
          <p className={styles.menuLabel}>Explore / Portfolio</p>
          <ul className={styles.mobileLinks}>
            {links.map((link, index) => (
              <li key={link.path}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  onClick={onNavigate}
                  mobile
                  number={index + 1}
                />
              </li>
            ))}
          </ul>
          <div className={styles.stripes} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
