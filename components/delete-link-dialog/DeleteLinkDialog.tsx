"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteLinkAction, type DeleteLinkInput } from "./actions";

interface DeleteLinkDialogProps {
    linkId: number;
    slug: string;
}

export function DeleteLinkDialog({ linkId, slug }: DeleteLinkDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
        setError(null);
        setIsLoading(true);

        try {
            const data: DeleteLinkInput = {
                id: linkId,
            };

            const result = await deleteLinkAction(data);

            if (result.error) {
                setError(result.error);
            } else {
                // Success - close dialog
                setOpen(false);
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Delete error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    function handleOpenChange(newOpen: boolean) {
        setOpen(newOpen);
        if (newOpen) {
            setError(null);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Link</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this link? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-md bg-muted p-3">
                        <p className="text-sm font-medium">Slug:</p>
                        <p className="text-sm font-mono text-muted-foreground">{slug}</p>
                    </div>
                    {error && (
                        <div className="mt-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete Link"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
