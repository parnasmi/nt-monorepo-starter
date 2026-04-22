export default function TasksPage() {
	const tasks = [
		{
			id: 'TSK-301',
			title: 'Follow up with Selecter Kleur',
			assignee: 'Anna V.',
			priority: 'High',
			due: '21 Apr 2026'
		},
		{
			id: 'TSK-302',
			title: 'Prepare Q2 proposal for Hornbach',
			assignee: 'Mark B.',
			priority: 'Medium',
			due: '25 Apr 2026'
		},
		{
			id: 'TSK-303',
			title: 'Schedule demo for Praxis chain',
			assignee: 'Sophie L.',
			priority: 'High',
			due: '22 Apr 2026'
		},
		{
			id: 'TSK-304',
			title: 'Review contract terms — Blindingen',
			assignee: 'Dilshod E.',
			priority: 'Low',
			due: '30 Apr 2026'
		},
		{
			id: 'TSK-305',
			title: 'Send updated pricing sheet',
			assignee: 'Anna V.',
			priority: 'Medium',
			due: '23 Apr 2026'
		}
	]

	return (
		<section className='space-y-4 p-3 sm:p-5'>
			<div className='naiton-surface rounded-[26px] p-5'>
				<p className='text-sm font-semibold tracking-[0.22em] text-slate-500 uppercase'>CRM</p>
				<h1 className='mt-2 text-3xl font-semibold tracking-tight text-slate-800'>Tasks</h1>
				<p className='mt-2 max-w-2xl text-sm text-slate-500'>Track follow-ups, deadlines, and team assignments.</p>
			</div>

			<div className='space-y-3'>
				{tasks.map((t) => (
					<div key={t.id} className='naiton-surface flex items-center justify-between rounded-[20px] p-4'>
						<div className='flex items-center gap-4'>
							<span
								className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${
									t.priority === 'High' ? 'bg-red-500' : t.priority === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'
								}`}
							>
								{t.priority[0]}
							</span>
							<div>
								<p className='font-semibold text-slate-800'>{t.title}</p>
								<p className='text-xs text-slate-500'>
									{t.id} · {t.assignee}
								</p>
							</div>
						</div>
						<span className='text-sm text-slate-500'>{t.due}</span>
					</div>
				))}
			</div>
		</section>
	)
}
