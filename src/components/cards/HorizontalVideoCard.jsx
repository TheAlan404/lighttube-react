import { AspectRatio, Avatar, Grid, Group, Image, Paper, Stack, Text, TypographyStylesProvider } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom';
import { createQuery } from '../../lib/utils';
import TextWithTooltip from '../util/TextWithTooltip';
import { Channel, MiniInfo, Thumbnail } from './common';

function HorizontalVideoCard(props) {
	return (<Paper p={props.size ? 0 : "sm"} shadow="md" withBorder
		sx={(theme) => ({
			...theme.fn.focusStyles(),
			cursor: 'pointer',
            '&:hover': {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            },
		})} component={Link} to={"/lighttube-react/watch?" + createQuery({ v: props.id })}>
		<Grid gutter={props.size} style={{ flexWrap: "nowrap", }}>
			<Grid.Col span="content">
				<Thumbnail {...props} />
			</Grid.Col>
			<Grid.Col span="auto">
				<Stack spacing={0}>
					<Text my={props.size && 0} py={props.size && 0}>
						<TextWithTooltip inherit fz="lg" fw={500}
							lineClamp={2}>{props.title}</TextWithTooltip>
						<MiniInfo {...props} />
						<Channel {...props} />
						<TextWithTooltip c="dimmed" inherit lineClamp={1}>
							<TypographyStylesProvider>
								<div dangerouslySetInnerHTML={{ __html: props.description }} />
							</TypographyStylesProvider>
						</TextWithTooltip>
					</Text>
				</Stack>
			</Grid.Col>
		</Grid>
	</Paper>);
}

export default HorizontalVideoCard
