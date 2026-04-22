import type { ReactElement, SVGProps } from 'react'

export type SvgIconProps = {
	icon: ReactElement<SVGProps<SVGSVGElement>>
	width?: number
	height?: number
	className?: string
}
