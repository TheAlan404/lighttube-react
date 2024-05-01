import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider, createTheme } from "@mantine/core"
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import { APIControllerProvider } from "./api/context/APIController.tsx"
import { VideoPlayerProvider } from "./api/context/VideoPlayerProvider.tsx"
import { PreferencesProvider } from "./api/pref/Preferences.tsx"
import { NavigationProgress } from "@mantine/nprogress"
import { NekoTubeRouter } from "./site/NekoTubeRouter.tsx"
import { OptionsProvider } from "./components/options/OptionsContext.tsx"

const theme = createTheme({
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#25262b',
            '#1A1B1E',
            '#141517',
            '#101113',
        ],
    },
    components: {
        Tooltip: {
            defaultProps: {
                color: "dark",
            },
            styles: {
                color: "var(--mantine-color-text)"
            }
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <NavigationProgress color="violet" />
        <APIControllerProvider>
            <PreferencesProvider>
                <VideoPlayerProvider>
                    <OptionsProvider>
                        <NekoTubeRouter />
                    </OptionsProvider>
                </VideoPlayerProvider>
            </PreferencesProvider>
        </APIControllerProvider>
    </MantineProvider>,
)