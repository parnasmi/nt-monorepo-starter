export default function OffersPage() {
	const offers = [
		{
			id: 'OFF-1001',
			client: 'Praxis Amsterdam',
			total: '$45,200',
			status: 'Pending',
			valid: '15 May 2026'
		},
		{
			id: 'OFF-1002',
			client: 'Hornbach Zwolle',
			total: '$12,800',
			status: 'Accepted',
			valid: '20 May 2026'
		},
		{ id: 'OFF-1003', client: 'Kleur Cascade', total: '$78,500', status: 'Draft', valid: '—' },
		{
			id: 'OFF-1004',
			client: 'Blindingen Maat L',
			total: '$34,100',
			status: 'Expired',
			valid: '01 Apr 2026'
		},
		{
			id: 'OFF-1005',
			client: 'Selecter Kleur',
			total: '$91,000',
			status: 'Accepted',
			valid: '10 Jun 2026'
		},
		{
			id: 'OFF-1006',
			client: 'Praxis Oudenbosch',
			total: '$22,350',
			status: 'Pending',
			valid: '25 May 2026'
		}
	]

	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>Sales</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Offers</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Manage quotes and proposals sent to clients.</p>
			</div>

			<div className='naiton-surface overflow-hidden rounded-[24px]'>
				<table className='w-full text-left text-sm'>
					<thead className='border-b border-slate-200 bg-slate-50/60'>
						<tr>
							{['ID', 'Client', 'Total', 'Status', 'Valid until'].map((h) => (
								<th key={h} className='px-4 py-3 font-medium text-slate-500'>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{offers.map((o) => (
							<tr key={o.id} className='border-b border-slate-100 last:border-0'>
								<td className='px-4 py-3 font-semibold text-emerald-600'>{o.id}</td>
								<td className='px-4 py-3 text-slate-700'>{o.client}</td>
								<td className='px-4 py-3 text-slate-700'>{o.total}</td>
								<td className='px-4 py-3'>
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-medium ${
											o.status === 'Accepted'
												? 'bg-emerald-50 text-emerald-700'
												: o.status === 'Pending'
													? 'bg-amber-50 text-amber-700'
													: o.status === 'Expired'
														? 'bg-red-50 text-red-600'
														: 'bg-slate-100 text-slate-600'
										}`}
									>
										{o.status}
									</span>
								</td>
								<td className='px-4 py-3 text-slate-500'>{o.valid}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
