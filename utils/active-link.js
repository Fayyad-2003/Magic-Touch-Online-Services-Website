export const isActive = (linkPath, pathname) => {
    if (linkPath === "/categories/Moving") {
    return pathname?.startsWith("/search") || 
      pathname?.startsWith("/services") || 
      pathname?.startsWith("/categories");
    }
    return pathname === linkPath;
};