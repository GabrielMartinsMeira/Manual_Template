"use client";

import { FaSearch, FaFilePdf } from 'react-icons/fa';
import useTranslations from '../../hooks/useTranslations';
import useScrollSpy from '../../hooks/useScrollSpy';

const Nav = ({ language, type, initialSections, isSidebarActive, toggleSidebar }) => {
  const t = useTranslations(language);
  const { activeSection, expandedGroups, handleSectionClick, toggleGroup } = useScrollSpy(initialSections || []);

  const activeSectionObj = initialSections?.find(s => s.slug === activeSection);
  const activeSectionTitle = activeSectionObj ? activeSectionObj.title : '';

  const renderNavigationItems = () => {
    if (!initialSections || initialSections.length === 0) {
      return <li>{t.loading}</li>;
    }

    const sectionsByGroup = {};

    initialSections.forEach(section => {
      const groupName = section.group || (language === "en" ? 'Others' : 'Outros');
      if (!sectionsByGroup[groupName]) {
        sectionsByGroup[groupName] = { sections: [], subgroups: {} };
      }

      if (section.subgroup) {
        if (!sectionsByGroup[groupName].subgroups[section.subgroup]) {
          sectionsByGroup[groupName].subgroups[section.subgroup] = [];
        }
        sectionsByGroup[groupName].subgroups[section.subgroup].push(section);
      } else {
        sectionsByGroup[groupName].sections.push(section);
      }
    });

    const sortedGroupNames = Object.keys(sectionsByGroup).sort((a, b) => {
      const getMinOrder = (groupData) => {
        const sectionsOrder = groupData.sections.map(s => s.order);
        const subgroupsOrder = Object.values(groupData.subgroups).flat().map(s => s.order);
        return Math.min(...sectionsOrder, ...subgroupsOrder);
      };
      return getMinOrder(sectionsByGroup[a]) - getMinOrder(sectionsByGroup[b]);
    });

    return (
      <>
        {sortedGroupNames.map(groupName => {
          const groupData = sectionsByGroup[groupName];
          const groupSlug = groupName.toLowerCase().replace(/\s+/g, '-');
          const isExpanded = expandedGroups[groupSlug];

          const hasSubgroups = Object.keys(groupData.subgroups).length > 0;

          if (!hasSubgroups && groupData.sections.length === 1) {
            const section = groupData.sections[0];
            return (
              <li key={section.slug}>
                <button
                  type="button"
                  className={`dropdown-item nav-link ${activeSection === section.slug ? 'active' : ''}`}
                  onClick={(e) => {
                    handleSectionClick(e, section.slug);
                    if (window.innerWidth < 992 && isSidebarActive) {
                      toggleSidebar();
                    }
                  }}
                >
                  {section.title}
                </button>
              </li>
            );
          }

          // Combine sections and subgroups for sorting
          const combinedItems = [
            ...groupData.sections.map(section => ({ type: 'section', data: section, order: section.order })),
            ...Object.keys(groupData.subgroups).map(subgroupName => {
              const subgroupSections = groupData.subgroups[subgroupName];
              subgroupSections.sort((a, b) => a.order - b.order);
              const minOrder = subgroupSections.length > 0 ? subgroupSections[0].order : 0;
              return { type: 'subgroup', name: subgroupName, sections: subgroupSections, order: minOrder };
            })
          ];

          combinedItems.sort((a, b) => a.order - b.order);

          return (
            <li key={groupName}>
              <button
                type="button"
                className={`dropdown-toggle ${isExpanded ? '' : 'collapsed'}`}
                onClick={(e) => {
                  e.currentTarget.blur();
                  toggleGroup(groupSlug);
                }}
                aria-expanded={isExpanded}
                aria-controls={`${groupSlug}-submenu`}
              >
                {groupName}
              </button>
              <ul
                className={`list-unstyled submenu-list ${isExpanded ? 'show' : 'collapse'}`}
                id={`${groupSlug}-submenu`}
              >
                {combinedItems.map((item, index) => {
                  if (item.type === 'section') {
                    const section = item.data;
                    return (
                      <li key={`sec-${section.slug}`}>
                        <button
                          type="button"
                          className={`dropdown-item nav-link ${activeSection === section.slug ? 'active' : ''}`}
                          onClick={(e) => {
                            handleSectionClick(e, section.slug, groupSlug);
                            if (window.innerWidth < 992 && isSidebarActive) {
                              toggleSidebar();
                            }
                          }}
                        >
                          {section.title}
                        </button>
                      </li>
                    );
                  } else {
                    const subgroupName = item.name;
                    const subgroupSections = item.sections;
                    const subgroupSlug = subgroupName.toLowerCase().replace(/\s+/g, '-');
                    const isSubgroupExpanded = expandedGroups[subgroupSlug];

                    return (
                      <li key={`sub-${subgroupName}`} className="mt-2">
                        <button
                          type="button"
                          className={`dropdown-toggle subgroup-toggle ${isSubgroupExpanded ? '' : 'collapsed'}`}
                          onClick={(e) => {
                            e.currentTarget.blur();
                            toggleGroup(subgroupSlug, groupSlug);
                          }}
                          aria-expanded={isSubgroupExpanded}
                          aria-controls={`${subgroupSlug}-submenu`}
                        >
                          {subgroupName}
                        </button>
                        <ul
                          className={`list-unstyled submenu-list ${isSubgroupExpanded ? 'show' : 'collapse'}`}
                          id={`${subgroupSlug}-submenu`}
                        >
                          {subgroupSections.map(section => (
                            <li key={section.slug}>
                              <button
                                type="button"
                                className={`dropdown-item nav-link subgroup-item ${activeSection === section.slug ? 'active' : ''}`}
                                onClick={(e) => {
                                  handleSectionClick(e, section.slug, groupSlug, subgroupSlug);
                                  if (window.innerWidth < 992 && isSidebarActive) {
                                    toggleSidebar();
                                  }
                                }}
                              >
                                {section.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <>
      <nav id="sidebar" className={`scrollspy ${isSidebarActive ? 'active' : ''}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between">
          <p className="h4 mb-0">{t.header}</p>
          <button
            type="button"
            className="btn-close d-lg-none"
            aria-label="Close sidebar"
            onClick={toggleSidebar}
          />
        </div>

        <ul className="list-unstyled CTAs pb-0 mb-0 d-xss-none d-md-none">
          <li>
            <button
              className="btn btn-primary col-12"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#search-offcanvas"
              aria-controls="search-offcanvas"
              id="sidebar-search-btn"
            >
              <p className="d-inline">
                {t.search}
              </p>
              <FaSearch />
            </button>
          </li>
        </ul>

        <ul className="list-unstyled components" id="sidebar-components">
          {renderNavigationItems()}
          <li>
            <button
              type="button"
              className={`dropdown-item nav-link ${activeSection === 'fale-conosco' ? 'active' : ''}`}
              onClick={(e) => {
                handleSectionClick(e, 'fale-conosco');
                if (window.innerWidth < 992 && isSidebarActive) {
                  toggleSidebar();
                }
              }}
            >
              {t.contactTitle}
            </button>
          </li>
        </ul>

        <ul className="list-unstyled CTAs mb-0">
          <li className="d-flex justify-content-center">
            <button
              onClick={() => {
                window.print();
              }}
              data-tooltip={t.export}
              className="tooltip-left btn btn-link p-0 border-0 bg-transparent export-btn"
              aria-label={t.export}
            >
              <FaFilePdf size={24} title={t.export} />
            </button>
          </li>
        </ul>
      </nav>
      {isSidebarActive && (
        <div
          id="sidebar-overlay"
          className="active"
          onClick={toggleSidebar}
        />
      )}
      <div className={`floating-section-indicator ${!isSidebarActive && activeSectionTitle ? 'show' : ''}`}>
        {activeSectionTitle}
      </div>
    </>
  );
};

export default Nav;