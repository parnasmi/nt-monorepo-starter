const lanes = [
	{ name: 'Line A', status: 'Running', efficiency: '92%' },
	{ name: 'Line B', status: 'Setup', efficiency: '68%' },
	{ name: 'Line C', status: 'Maintenance', efficiency: '41%' }
]

export default function ProductionPage() {
	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-6'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>Production</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Line performance shell</h1>
			</div>
			<div className='grid gap-4 xl:grid-cols-[1.3fr_1fr]'>
				<div className='naiton-grid-bg naiton-surface rounded-[24px] p-6'>
					<div className='grid gap-4 md:grid-cols-3'>
						{lanes.map((lane) => (
							<div key={lane.name} className='rounded-[22px] border border-white/80 bg-white/90 p-5'>
								<p className='text-sm text-slate-500'>{lane.name}</p>
								<p className='mt-2 text-xl font-semibold text-slate-800'>{lane.status}</p>
								<p className='mt-6 text-sm text-slate-500'>Efficiency</p>
								<p className='text-3xl font-semibold tracking-tight text-slate-800'>{lane.efficiency}</p>
							</div>
						))}
					</div>
				</div>
				<div className='naiton-surface rounded-[24px] p-6'>
					<p className='text-lg font-semibold text-slate-800'>Next iteration</p>
					<p className='mt-3 text-sm leading-6 text-slate-500'>
						Work orders, downtime events, and throughput analytics are ready to slot into the persistent module frame
						built in this phase.
					</p>
				</div>
			</div>
		</section>
	)
}
