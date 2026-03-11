import { Hamburger, NavDrawer, NavDrawerBody, NavDrawerHeader, NavItem, Tooltip } from '@fluentui/react-components'
import { useState, type ReactElement} from 'react';
import TableAltText from '../icons-bundled/TableAltTextBundled';
import { useNav, type NavView } from '../context/NavContext';

const navItems: Array<{ value: NavView; label: string; icon: ReactElement }> = [
  { value: 'Table view', label: 'Table view', icon: <TableAltText /> },
  { value: 'Entity-Relationship flow graph', label: 'ER Flow', icon: <TableAltText /> },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { view, setView } = useNav();

  return (
    <div className='Navigation'>
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <Tooltip content={isOpen ? 'Close navigation' : 'Open navigation'} relationship="label">
          <Hamburger onClick={() => setIsOpen((prev) => !prev)} />
        </Tooltip>
        <p>{view}</p>
      </div>

      <NavDrawer open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)}>
        <NavDrawerHeader>
          <p style={{ fontWeight: 600 }}>ETFA Explorer</p>
        </NavDrawerHeader>
        <NavDrawerBody>
          {navItems.map((item) => (
            <NavItem
              key={item.value}
              as="a"
              value={item.value}
              href="#"
              icon={item.icon}
              onClick={() => setView(item.value)}
            >
              {item.label}
            </NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
}
