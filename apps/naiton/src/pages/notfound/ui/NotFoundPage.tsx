import { Button } from '@repo/ui-kit/shadcn/button'
import { Compass } from 'lucide-react'
import { NavLink } from 'react-router'

import { getAppsRoute, getRouteAuthLogin } from '@/shared/const/router.const'

export default function NotFoundPage() {
	return (
		<main className='flex min-h-screen items-center justify-center p-6'>
			<section className='naiton-panel max-w-xl rounded-[32px] p-8 text-center'>
				<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600'>
					<Compass className='h-8 w-8' />
				</div>
				<h1 className='mt-5 text-4xl font-semibold tracking-tight text-slate-800'>Page not found</h1>
				<p className='mt-3 text-sm leading-6 text-slate-500'>
					This route is outside the current shell map. The router is live, and unmatched paths now fall back to a
					dedicated experience.
				</p>
				<div className='mt-6 flex flex-wrap justify-center gap-3'>
					<Button asChild className='rounded-xl'>
						<NavLink to={`${getAppsRoute()}/dashboard`}>Open dashboard</NavLink>
					</Button>
					<Button asChild className='rounded-xl' variant='outline'>
						<NavLink to={getRouteAuthLogin()}>Login route</NavLink>
					</Button>
				</div>
			</section>
		</main>
	)
}
