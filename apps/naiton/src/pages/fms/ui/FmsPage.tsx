import { cn } from '@repo/ui-kit/lib/utils'
import { Search } from 'lucide-react'

const vehicles = [
	{
		code: '49-BBH-3',
		time: '25-Jul-2026, 03:36',
		speed: '49 km/h',
		place: 'Esse Hogering',
		color: 'bg-emerald-500'
	},
	{
		code: 'ZK-107-L',
		time: '25-Jul-2026, 03:36',
		speed: '0 km/h',
		place: 'Esse Hogering',
		color: 'bg-red-400'
	},
	{
		code: 'ZK-108-L',
		time: '26-Jul-2026, 04:15',
		speed: '15 km/h',
		place: 'BP Tower',
		color: 'bg-red-400'
	},
	{
		code: 'ZK-111-L',
		time: '27-Jul-2026, 07:45',
		speed: '25 km/h',
		place: 'Total Energy',
		color: 'bg-orange-400'
	},
	{
		code: 'ZK-112-L',
		time: '30-Jul-2026, 08:15',
		speed: '5 km/h',
		place: 'Mobil Station',
		color: 'bg-emerald-400'
	},
	{
		code: 'ZK-113-L',
		time: '31-Jul-2026, 09:00',
		speed: '30 km/h',
		place: 'Repsol Office',
		color: 'bg-orange-400'
	},
	{
		code: '74-WWB-3',
		time: '25-Jul-2026, 03:36',
		speed: '0 km/h',
		place: 'Esse Hogering',
		color: 'bg-violet-400'
	},
	{
		code: 'ZX-109-L',
		time: '27-Jul-2026, 05:00',
		speed: '20 km/h',
		place: 'Shell Plaza',
		color: 'bg-emerald-400'
	}
]

export default function FmsPage() {
	return (
		<section className='h-full p-3 sm:p-5'>
			<div className='naiton-surface grid h-[calc(100vh-112px)] gap-0 overflow-hidden rounded-[26px] xl:grid-cols-[290px_1fr]'>
				<div className='border-r border-slate-200 bg-white/82 p-3'>
					<div className='flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500'>
						<Search className='h-4 w-4' />
						Search
					</div>
					<div className='mt-3 space-y-2 overflow-auto pr-1'>
						{vehicles.map((vehicle) => (
							<article key={vehicle.code} className='rounded-[18px] border border-slate-200 bg-white p-3 shadow-sm'>
								<div className='flex items-start justify-between gap-3'>
									<div>
										<p className='font-semibold text-slate-800'>{vehicle.code}</p>
										<p className='text-xs text-slate-500'>{vehicle.time}</p>
										<p className='mt-1 text-sm text-slate-600'>{vehicle.place}</p>
									</div>
									<div className='text-right'>
										<span className={cn('mb-2 inline-flex h-2.5 w-2.5 rounded-full', vehicle.color)} />
										<p className='text-xs font-semibold text-slate-500'>{vehicle.speed}</p>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>

				<div className='relative overflow-hidden'>
					<div className='naiton-map-bg absolute inset-0' />
					<div className='absolute top-6 left-6 rounded-2xl border border-white/60 bg-white/92 px-4 py-3 shadow-lg'>
						<p className='text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase'>FMS</p>
						<p className='mt-1 text-lg font-semibold text-slate-800'>Live fleet map</p>
					</div>
					<div className='absolute right-6 bottom-6 flex flex-col gap-3'>
						{['+', '−'].map((symbol) => (
							<button
								key={symbol}
								className='flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/90 text-xl font-semibold text-slate-700 shadow-lg'
								type='button'
							>
								{symbol}
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
