import type { FC, ReactNode } from 'react'

type ScrollContainerProps = {
	children: ReactNode
	mode?: 'inner' | 'page'
}

export const ScrollContainer: FC<ScrollContainerProps> = ({ children, mode = 'inner' }) => {
	if (mode === 'inner') {
		return <div className='h-[calc(100vh-72px)] overflow-auto'>{children}</div>
	}

	return <>{children}</>
}
