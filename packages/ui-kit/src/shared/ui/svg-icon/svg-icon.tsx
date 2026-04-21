import { cloneElement, isValidElement } from 'react'
import type { SvgIconProps } from './types'

export const SvgIcon = ({ icon, width = 24, height = 24, className = '' }: SvgIconProps) => {
	const iconWithProps = isValidElement(icon) ? cloneElement(icon, { width, height, className }) : icon

	return <>{iconWithProps}</>
}
