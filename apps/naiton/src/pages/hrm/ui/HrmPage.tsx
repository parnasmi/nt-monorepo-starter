const workforce = [
	{ title: 'Employees', value: '1245' },
	{ title: 'Open roles', value: '16' },
	{ title: 'Retention', value: '94%' },
	{ title: 'Training hours', value: '382' }
]

export default function HrmPage() {
	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-6'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>HRM</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>People operations preview</h1>
			</div>
			<div className='grid gap-4 xl:grid-cols-4'>
				{workforce.map((card) => (
					<div key={card.title} className='naiton-surface rounded-[24px] p-5'>
						<p className='text-sm text-slate-500'>{card.title}</p>
						<p className='mt-3 text-3xl font-semibold tracking-tight text-slate-800'>{card.value}</p>
					</div>
				))}
			</div>
			<div className='grid gap-4 xl:grid-cols-[1.3fr_1fr]'>
				<div className='naiton-grid-bg naiton-surface rounded-[24px] p-6'>
					<div className='grid gap-4 md:grid-cols-2'>
						<div className='rounded-[22px] border border-white/80 bg-white/90 p-5'>
							<p className='text-lg font-semibold text-slate-800'>Engagement pulse</p>
							<div className='mt-5 h-56 rounded-[18px] bg-gradient-to-br from-pink-100 to-amber-50' />
						</div>
						<div className='rounded-[22px] border border-white/80 bg-white/90 p-5'>
							<p className='text-lg font-semibold text-slate-800'>Hiring lane</p>
							<div className='mt-5 h-56 rounded-[18px] bg-gradient-to-br from-emerald-100 to-cyan-50' />
						</div>
					</div>
				</div>
				<div className='naiton-surface rounded-[24px] p-6 text-sm text-slate-600'>
					Phase 8 keeps HRM intentionally static while the multi-shell routing structure hardens.
				</div>
			</div>
		</section>
	)
}
