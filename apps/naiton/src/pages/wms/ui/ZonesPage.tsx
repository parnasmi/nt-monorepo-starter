export default function ZonesPage() {
	const zones = [
		{ name: 'Zone A — Receiving', racks: 24, utilization: 78, temp: 'Ambient' },
		{ name: 'Zone B — Bulk Storage', racks: 48, utilization: 92, temp: 'Ambient' },
		{ name: 'Zone C — Cold Chain', racks: 16, utilization: 65, temp: '-18°C' },
		{ name: 'Zone D — Dispatch', racks: 12, utilization: 41, temp: 'Ambient' },
		{ name: 'Zone E — Returns', racks: 8, utilization: 55, temp: 'Ambient' }
	]

	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>WMS</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Zones</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Warehouse zone layout and utilization overview.</p>
			</div>

			<div className='grid gap-4 xl:grid-cols-2'>
				{zones.map((z) => (
					<div key={z.name} className='naiton-surface rounded-[24px] p-5'>
						<div className='flex items-start justify-between'>
							<div>
								<p className='font-semibold text-slate-800'>{z.name}</p>
								<p className='mt-1 text-xs text-slate-500'>
									{z.racks} racks · {z.temp}
								</p>
							</div>
							<span
								className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
									z.utilization > 85
										? 'bg-red-50 text-red-600'
										: z.utilization > 60
											? 'bg-amber-50 text-amber-600'
											: 'bg-emerald-50 text-emerald-600'
								}`}
							>
								{z.utilization}%
							</span>
						</div>
						<div className='mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100'>
							<div
								className={`h-full rounded-full ${
									z.utilization > 85 ? 'bg-red-500' : z.utilization > 60 ? 'bg-amber-500' : 'bg-emerald-500'
								}`}
								style={{ width: `${z.utilization}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
