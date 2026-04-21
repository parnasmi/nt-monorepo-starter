export default function RecruitmentPage() {
	const openings = [
		{
			title: 'Senior Frontend Developer',
			dept: 'Engineering',
			applicants: 24,
			stage: 'Interviewing',
			posted: '05 Apr 2026'
		},
		{
			title: 'Supply Chain Analyst',
			dept: 'Operations',
			applicants: 18,
			stage: 'Screening',
			posted: '10 Apr 2026'
		},
		{
			title: 'Sales Manager — DACH',
			dept: 'Sales',
			applicants: 31,
			stage: 'Offer sent',
			posted: '28 Mar 2026'
		},
		{
			title: 'Warehouse Supervisor',
			dept: 'Logistics',
			applicants: 12,
			stage: 'New',
			posted: '15 Apr 2026'
		},
		{
			title: 'UX Designer',
			dept: 'Product',
			applicants: 42,
			stage: 'Interviewing',
			posted: '01 Apr 2026'
		}
	]

	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>HRM</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Recruitment</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Open positions and candidate pipeline management.</p>
			</div>

			<div className='space-y-3'>
				{openings.map((o) => (
					<div key={o.title} className='naiton-surface flex items-center justify-between rounded-[20px] p-4'>
						<div>
							<p className='font-semibold text-slate-800'>{o.title}</p>
							<p className='text-xs text-slate-500'>
								{o.dept} · Posted {o.posted} · {o.applicants} applicants
							</p>
						</div>
						<span
							className={`rounded-full px-2.5 py-1 text-xs font-medium ${
								o.stage === 'Offer sent'
									? 'bg-emerald-50 text-emerald-700'
									: o.stage === 'Interviewing'
										? 'bg-sky-50 text-sky-700'
										: o.stage === 'Screening'
											? 'bg-amber-50 text-amber-700'
											: 'bg-slate-100 text-slate-600'
							}`}
						>
							{o.stage}
						</span>
					</div>
				))}
			</div>
		</section>
	)
}
