import { Button } from '@repo/ui-kit/shadcn/button'
import { ShieldAlert } from 'lucide-react'
import { NavLink } from 'react-router'
import { getAppsRoute, getRouteAuthLogin } from '@/shared/const/router.const'

export default function ForbiddenPage() {
	return (
		<main className='flex min-h-screen items-center justify-center p-6'>
			<section className='naiton-panel max-w-xl rounded-[32px] p-8 text-center'>
				<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600'>
					<ShieldAlert className='h-8 w-8' />
				</div>
				<h1 className='mt-5 text-4xl font-semibold tracking-tight text-slate-800'>Access restricted</h1>
				<p className='mt-3 text-sm leading-6 text-slate-500'>
					Your current subscription does not include this product yet. The route guard is active and the persistent
					shell is working as expected.
				</p>
				<div className='mt-6 flex flex-wrap justify-center gap-3'>
					<Button asChild className='rounded-xl'>
						<NavLink to={`${getAppsRoute()}/dashboard`}>Go to dashboard</NavLink>
					</Button>
					<Button asChild className='rounded-xl' variant='outline'>
						<NavLink to={getRouteAuthLogin()}>Back to login</NavLink>
					</Button>
				</div>
			</section>
		</main>
	)
}
