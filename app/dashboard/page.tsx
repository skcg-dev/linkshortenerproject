
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/get-user-links";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreateLinkDialog } from "@/components/create-link-dialog/CreateLinkDialog";
import { EditLinkDialog } from "@/components/edit-link-dialog/EditLinkDialog";
import { DeleteLinkDialog } from "@/components/delete-link-dialog/DeleteLinkDialog";

export default async function DashboardPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/");
    }

    const links = await getUserLinks(userId);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <CreateLinkDialog />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {links.length === 0 ? (
                            <p className="text-muted-foreground">No links found.</p>
                        ) : (
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                                <span className="font-mono text-sm text-primary">{link.slug}</span>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline break-all"
                                                >
                                                    {link.url}
                                                </a>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(link.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <EditLinkDialog link={link} />
                                                <DeleteLinkDialog linkId={link.id} slug={link.slug} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
