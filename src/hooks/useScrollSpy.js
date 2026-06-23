import { useState, useEffect } from 'react';

const useScrollSpy = (sections) => {
  const [activeSection, setActiveSection] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);

        // Find the section to see if it belongs to a group or subgroup
        const section = sections.find(s => s.slug === hash);
        if (section) {
          setExpandedGroups(prev => {
            const newExpanded = { ...prev };
            if (section.group) {
              const groupSlug = section.group.toLowerCase().replace(/\s+/g, '-');
              newExpanded[groupSlug] = true;
            }
            if (section.subgroup) {
              const subgroupSlug = section.subgroup.toLowerCase().replace(/\s+/g, '-');
              newExpanded[subgroupSlug] = true;
            }
            return newExpanded;
          });
        }

        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Run once on load/sections change
    if (sections.length > 0) {
      handleHashChange();
    }

    // ScrollSpy Logic using IntersectionObserver
    const observerOptions = {
      root: null, // use viewport
      rootMargin: '-10% 0px -85% 0px', // Focus on the top 10%-15% of the screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slug = entry.target.id;
          setActiveSection(slug);

          // Auto-expand group and subgroup if not already expanded
          const sectionRef = sections.find(s => s.slug === slug);
          if (sectionRef) {
            const newExpanded = {};
            if (sectionRef.group) {
              const groupSlug = sectionRef.group.toLowerCase().replace(/\s+/g, '-');
              newExpanded[groupSlug] = true;
            }
            if (sectionRef.subgroup) {
              const subgroupSlug = sectionRef.subgroup.toLowerCase().replace(/\s+/g, '-');
              newExpanded[subgroupSlug] = true;
            }
            setExpandedGroups(newExpanded);
          } else {
            setExpandedGroups({});
          }
        } else {
          // If the section that was active is now NOT intersecting,
          // and we haven't already switched to another focus, clear it.
          // Note: This might trigger slightly when switching, so we check the active state.
          setActiveSection(prev => (prev === entry.target.id ? '' : prev));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Give a small delay to ensure ManualSection components have rendered their IDs
    const timeoutId = setTimeout(() => {
      const sectionElements = document.querySelectorAll('.manual-section');
      sectionElements.forEach(el => observer.observe(el));
    }, 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [sections]);

  const handleSectionClick = (e, slug, groupSlug = null, subgroupSlug = null) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove focus to avoid CSS :focus styles staying on the button
    if (e.currentTarget) {
      e.currentTarget.blur();
    }

    const element = document.getElementById(slug);
    if (element) {
      setActiveSection(slug);

      // Manage group/subgroup expansion
      const newExpanded = {};
      if (groupSlug) {
        newExpanded[groupSlug] = true;
      }
      if (subgroupSlug) {
        newExpanded[subgroupSlug] = true;
      }
      setExpandedGroups(newExpanded);

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const currentPath = window.location.pathname;
      window.history.replaceState(null, '', `${currentPath}#${slug}`);

      // Close sidebar on mobile
      if (window.innerWidth < 992) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
          const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
          document.cookie = `sidebarActive=false; expires=${expires}; path=/; SameSite=Lax`;
        }
      }
    } else {
      console.warn(`Element with id "${slug}" not found`);
    }
  };

  const toggleGroup = (groupSlug, parentGroupSlug = null) => {
    setExpandedGroups(prev => {
      const isExpanded = prev[groupSlug];
      const newState = {};
      
      if (parentGroupSlug) {
        newState[parentGroupSlug] = true; // Keep parent open when toggling subgroup
      }
      
      newState[groupSlug] = !isExpanded;
      return newState;
    });
  };

  return {
    activeSection,
    expandedGroups,
    handleSectionClick,
    toggleGroup
  };
};

export default useScrollSpy;
