export default function SuppliersPage() {
	const suppliers = [
		{
			name: 'Acme Materials B.V.',
			category: 'Raw materials',
			rating: 4.8,
			orders: 142,
			location: 'Rotterdam'
		},
		{
			name: 'TechnoPlast GmbH',
			category: 'Packaging',
			rating: 4.5,
			orders: 89,
			location: 'Düsseldorf'
		},
		{ name: 'Nordic Steel AB', category: 'Metal', rating: 4.2, orders: 56, location: 'Gothenburg' },
		{
			name: 'EuroChemicals S.A.',
			category: 'Chemicals',
			rating: 3.9,
			orders: 34,
			location: 'Brussels'
		},
		{
			name: 'Pacific Components Ltd',
			category: 'Electronics',
			rating: 4.7,
			orders: 201,
			location: 'Shenzhen'
		}
	]

	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>Procurement</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Suppliers</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Approved supplier directory with performance ratings.</p>
			</div>

			<div className='naiton-surface overflow-hidden rounded-[24px]'>
				<table className='w-full text-left text-sm'>
					<thead className='border-b border-slate-200 bg-slate-50/60'>
						<tr>
							{['Supplier', 'Category', 'Rating', 'Orders', 'Location'].map((h) => (
								<th key={h} className='px-4 py-3 font-medium text-slate-500'>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{suppliers.map((s) => (
							<tr key={s.name} className='border-b border-slate-100 last:border-0'>
								<td className='px-4 py-3 font-semibold text-slate-800'>{s.name}</td>
								<td className='px-4 py-3 text-slate-600'>{s.category}</td>
								<td className='px-4 py-3'>
									<span className='font-semibold text-amber-600'>★ {s.rating}</span>
								</td>
								<td className='px-4 py-3 text-slate-700'>{s.orders}</td>
								<td className='px-4 py-3 text-slate-500'>{s.location}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
