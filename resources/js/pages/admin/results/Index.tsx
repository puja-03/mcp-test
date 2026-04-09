import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Index({ results, exams, filters }: any) {
    const [examId, setExamId] = useState(filters.exam_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/results', { exam_id: examId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this result?')) {
            router.delete(`/admin/results/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Results" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Results</h1>
                    <Button onClick={() => router.visit('/admin/results/create')}>Add Result</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <select 
                            value={examId} 
                            onChange={e => setExamId(e.target.value)}
                            className="flex h-10 w-[300px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Exams</option>
                            {exams.map((exam: any) => (
                                <option key={exam.id} value={exam.id}>{exam.exam_date} — {exam.title} ({exam.batch?.name})</option>
                            ))}
                        </select>
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Exam Date</th>
                                    <th className="h-12 px-4 text-left font-medium">Exam / Batch</th>
                                    <th className="h-12 px-4 text-left font-medium">Student</th>
                                    <th className="h-12 px-4 text-left font-medium">Marks Obtained</th>
                                    <th className="h-12 px-4 text-left font-medium">Pass/Fail</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {results.data.map((result: any) => {
                                    const maxMarks = result.exam?.max_marks;
                                    const passingMarks = result.exam?.passing_marks;
                                    const passed = passingMarks ? result.marks_obtained >= passingMarks : null;

                                    return (
                                        <tr key={result.id} className="border-b">
                                            <td className="p-4 align-middle whitespace-nowrap">{result.exam?.exam_date}</td>
                                            <td className="p-4 align-middle">
                                                <div className="font-medium">{result.exam?.title}</div>
                                                <div className="text-xs text-muted-foreground">{result.exam?.batch?.name}</div>
                                            </td>
                                            <td className="p-4 align-middle font-medium">{result.student?.name}</td>
                                            <td className="p-4 align-middle font-bold">
                                                {result.marks_obtained} <span className="text-muted-foreground font-normal">/ {maxMarks}</span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {passed === true && <span className="text-green-600 font-medium text-xs border border-green-600 px-2 py-1 rounded">PASS</span>}
                                                {passed === false && <span className="text-red-600 font-medium text-xs border border-red-600 px-2 py-1 rounded">FAIL</span>}
                                                {passed === null && <span className="text-muted-foreground whitespace-nowrap text-xs">N/A</span>}
                                            </td>
                                            <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/results/${result.id}/edit`)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(result.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {results.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">No results found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {results.links.map((link: any, key: number) => (
                        <Button 
                           key={key} 
                           variant={link.active ? "default" : "outline"}
                           disabled={!link.url}
                           dangerouslySetInnerHTML={{ __html: link.label }}
                           onClick={() => link.url && router.visit(link.url)}
                           size="sm"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
