import { useState } from 'react';
import { RadialButton, IconButton, type RadialTheme } from '@chop-shop/buttons';
import { FiHome, FiSearch, FiSettings, FiUser, FiBell } from 'react-icons/fi';
import './App.css';

const codeBlockStyles =
  'block p-4 border border-gray-200 rounded-xl bg-gray-950 text-green-400 overflow-x-auto text-sm leading-relaxed';

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
          Chop Shop Playground
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

      <div
        className="relative w-full max-w-6xl mx-auto mb-12 h-48 md:h-[400px] rounded-4xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-gray-800/50 group"
        data-testid="hero-image"
      >
        <img
          src={`${import.meta.env.BASE_URL}hero.png`}
          alt="chop shop hero"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Center */}
      <div className="flex flex-col m-8 gap-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Icon Button
          </h2>
          <p>Used for simple actions with well known icon recognition.</p>
          <code className={codeBlockStyles}>
            <pre>
              {`<IconButton theme="${theme}" title="Home">
  <FiHome />
</IconButton>`}
            </pre>
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
          <code className={codeBlockStyles}>
            <pre>
              {`const actions = [
  { label: 'Home', icon: <FiHome />, onClick: () => {} },
  { label: 'Profile', icon: <FiUser />, onClick: () => {} },
  { label: 'Settings', icon: <FiSettings />, onClick: () => {} },
];

<RadialButton 
  label="Center" 
  actions={actions} 
  theme="${theme}" 
/>
`}
            </pre>
          </code>
          <div className="p-2 flex gap-1 justify-between">
            <RadialButton label="Center" actions={actions} theme={theme} />
            <RadialButton label="Center" actions={actions} theme={theme} />
            <RadialButton label="Center" actions={actions} theme={theme} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
