import { useState } from 'react';
import { RadialButton, IconButton, type RadialTheme } from '@chop-shop/buttons';
import { FiHome, FiSearch, FiSettings, FiUser, FiBell } from 'react-icons/fi';
import './App.css';

function App() {
  const [theme, setTheme] = useState<RadialTheme>('berry');

  const actions = [
    {
      label: 'Home',
      icon: <FiHome />,
      onClick: () => console.log('home clicked'),
    },
    {
      label: 'Profile',
      icon: <FiUser />,
      onClick: () => console.log('profile clicked'),
    },
    {
      label: 'Settings',
      icon: <FiSettings />,
      onClick: () => console.log('settings clicked'),
    },
    {
      label: 'Search',
      icon: <FiSearch />,
      onClick: () => console.log('search clicked'),
    },
    {
      label: 'Notifications',
      icon: <FiBell />,
      onClick: () => console.log('notifications clicked'),
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Chop Shop Monorepo Playground
        </h1>

        <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <label
            htmlFor="theme-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Selected Theme:
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value as RadialTheme)}
            className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="berry">Berry (Fuchsia/Amber)</option>
            <option value="ocean">Ocean (Slate/Cyan)</option>
            <option value="forest">Forest (Green/Amber)</option>
            <option value="volcano">Volcano (Stone/Rose)</option>
          </select>
        </div>
      </header>

      <div className="flex justify-center mb-8 rounded-4xl overflow-hidden">
        <img
          src="/hero.png"
          alt="chop shop hero"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Center */}
      <div className="flex flex-col m-8 gap-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Icon Button
          </h2>
          <p>Used for simple actions with well known icon recognition.</p>
          <code className="flex p-2 border border-gray-200 rounded bg-gray-900 text-green-400">
            {`<IconButton theme="${theme}" title="Home">
          <FiHome />
        </IconButton>`}
          </code>
          <div className="p-2">
            <IconButton theme={theme} title="Home">
              <FiHome />
            </IconButton>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Radial Button
          </h2>
          <p>Used for complex actions with multiple options.</p>
          <code className="flex p-2 border border-gray-200 rounded bg-gray-900 text-green-400">
            {`<RadialButton label="Center" actions={actions} theme="${theme}" />`}
          </code>
          <div className="p-2">
            <RadialButton label="Center" actions={actions} theme={theme} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
