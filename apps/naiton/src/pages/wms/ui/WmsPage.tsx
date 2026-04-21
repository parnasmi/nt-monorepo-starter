const metrics = [
	{ label: 'Inbound today', value: '128 pallets' },
	{ label: 'Open transfers', value: '34 tasks' },
	{ label: 'Picking accuracy', value: '99.2%' },
	{ label: 'Dock utilization', value: '82%' }
]

export default function WmsPage() {
	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>WMS</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Warehouse orchestration</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>
					Phase 8 establishes the module shell. Live stock movements and transfer flows plug into the shared API layer
					in later phases.
				</p>
			</div>

			<div className='grid gap-4 xl:grid-cols-4'>
				{metrics.map((metric) => (
					<div key={metric.label} className='naiton-surface rounded-[24px] p-5'>
						<p className='text-sm text-slate-500'>{metric.label}</p>
						<p className='mt-3 text-3xl font-semibold tracking-tight text-slate-800'>{metric.value}</p>
					</div>
				))}
			</div>

			<div className='grid gap-4 xl:grid-cols-[1.5fr_1fr]'>
				<div className='naiton-grid-bg naiton-surface rounded-[24px] p-6'>
					<div className='grid gap-4 md:grid-cols-3'>
						{['Receiving', 'Storage', 'Dispatch'].map((zone) => (
							<div key={zone} className='rounded-[22px] border border-white/70 bg-white/85 p-5 shadow-sm'>
								<p className='text-sm font-semibold text-slate-500'>{zone}</p>
								<div className='mt-4 h-32 rounded-[18px] bg-gradient-to-br from-emerald-100 to-cyan-50' />
							</div>
						))}
					</div>
				</div>
				<div className='naiton-surface rounded-[24px] p-6'>
					<p className='text-lg font-semibold text-slate-800'>Shift readiness</p>
					<ul className='mt-4 space-y-3 text-sm text-slate-600'>
						<li>12 receiving slots staffed</li>
						<li>4 exception queues need review</li>
						<li>Wave 3 opens in 25 minutes</li>
						<li>Cold-chain capacity at 71%</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
