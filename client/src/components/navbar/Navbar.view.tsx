import { useNavbar } from './hooks';
import { getNavbarClasses } from './Navbar.utils';
import type { NavbarProps } from './Navbar.types';

export function NavbarView(props: NavbarProps) {
  const { formattedTitle, formattedDescription, currentTheme } = useNavbar(props);
  const { className = '', showBorder = true } = props;
  
  const navbarClasses = getNavbarClasses(showBorder, currentTheme);

  return (
    <nav 
      className={`${navbarClasses} ${className}`}
      data-testid="navbar"
    >
      <div className="navbar-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-content flex items-center h-[74px] min-h-[74px]">
          <div className="navbar-brand flex flex-col justify-center">
            <h1 
              className="navbar-title text-xl font-semibold text-gray-900 dark:text-white sm:text-xl"
              data-testid="navbar-title"
            >
              {formattedTitle}
            </h1>
            {formattedDescription && (
              <p 
                className="navbar-description text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:text-sm"
                data-testid="navbar-description"
              >
                {formattedDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}