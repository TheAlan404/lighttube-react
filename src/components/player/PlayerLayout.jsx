import { Box, Flex, Overlay, Progress, Stack, Transition } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import React, { useContext } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext';
import { SettingsContext } from '../../contexts/SettingsContext';
import PlayerControls from './PlayerControls';
import PlayerProgressBar from './PlayerProgressBar';

const PlayerLayout = () => {
    const ctx = useContext(PlayerContext);
    const pref = useContext(SettingsContext);
    const { ref, hovered } = useHover();

    return (
        <Box
            ref={ref}>
            <Transition
                mounted={(ctx.paused || hovered || pref.keepControls)}
                transition="fade"
                duration={200}>
                {(styles) => <Overlay
                    gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 20%)"
                    w="100%"
                    h="100%">
                    <Flex w="100%" h="100%" align="end" justify="center" onClick={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if ((
                            e.mozInputSource === 5
                        ) || (
                                e.type == "PointerEvent" && e.pointerType === "touch"
                            )) {

                            return;
                        };
                        ctx.togglePause();
                    }}>
                        <Stack justify="end" w={"100%"} spacing={0}>
                            <PlayerProgressBar />
                            <PlayerControls />
                        </Stack>
                    </Flex>
                </Overlay>}
            </Transition>
        </Box>
    )
}

export default PlayerLayout