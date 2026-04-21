export default function LogisticsPage() {
	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>Accounting</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Logistics</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Shipment tracking and logistics cost management.</p>
			</div>

			<div className='grid gap-4 xl:grid-cols-4'>
				{[
					{ label: 'Shipments today', value: '34' },
					{ label: 'In transit', value: '128' },
					{ label: 'Avg. delivery time', value: '2.4 days' },
					{ label: 'Logistics cost', value: '$48.2K' }
				].map((m) => (
					<div key={m.label} className='naiton-surface rounded-[24px] p-5'>
						<p className='text-sm text-slate-500'>{m.label}</p>
						<p className='mt-3 text-3xl font-semibold tracking-tight text-slate-800'>{m.value}</p>
					</div>
				))}
			</div>

			<div className='naiton-surface rounded-[24px] p-6'>
				<p className='text-lg font-semibold text-slate-800'>Recent shipments</p>
				<ul className='mt-4 space-y-3 text-sm text-slate-600'>
					<li className='flex items-center justify-between'>
						<span>SHP-9001 → Amsterdam Central</span>
						<span className='rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700'>
							Delivered
						</span>
					</li>
					<li className='flex items-center justify-between'>
						<span>SHP-9002 → Rotterdam Port</span>
						<span className='rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700'>In transit</span>
					</li>
					<li className='flex items-center justify-between'>
						<span>SHP-9003 → Utrecht Hub</span>
						<span className='rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700'>Pending</span>
					</li>
				</ul>
			</div>
		</section>
	)
}
