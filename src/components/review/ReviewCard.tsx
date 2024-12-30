import {Review} from "@/types/review";
import {RiDeleteBin6Fill, RiUser3Line} from "@remixicon/react";
import {useGetUserById} from "@/api/auth";
import {User} from "@/types/user";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/Button";
import {Card} from "@/components/ui/Card";
import {useUserStore} from "@/stores/userStore";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/Dialog";
import {useDeleteReview} from "@/api/review";
import {TOAST_TIMEOUT} from "@/constants";
import {useToast} from "@/hooks/useToast";
import {useQueryClient} from "@tanstack/react-query";

interface ReviewCardProps extends Review{}


export const ReviewCard=(props:ReviewCardProps)=>{

    const {data:user_data}=useGetUserById(props.user);
    const currentUserId=useUserStore((state)=>state._id);
    const userData=user_data?.data as User;
    const [showDeleteButton, setShowDeleteButton]=useState(false);
    const {mutate,isSuccess,isError,isPending,error}=useDeleteReview();
    const queryClient = useQueryClient();
    const {toast}=useToast();



    const handleDelete = ()=>{
       mutate(props._id as string);
    }

    useEffect(() => {
            if(currentUserId&&props){
                setShowDeleteButton(currentUserId===props.user)
            }
    }, [currentUserId,props]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Success",
                description: "Review has been deleted",
                variant: "success",
                duration: TOAST_TIMEOUT,
            });
            queryClient.invalidateQueries(["reviews"] as any);

        } else if (isError) {
            toast({
                title: "Error",
                description: error.message,
                variant: "error",
                duration: TOAST_TIMEOUT,
            });
        }
    }, [isError, isSuccess]);

    return (
        <Card className="flex justify-start gap-2 py-2 rounded-md  divide-gray-300 bg-transparent dark:text-white">
            <div className="flex flex-col items-center gap-2 w-[10%] self-center">
                <RiUser3Line className="h-10 w-10  rounded-full p-2"/>
                <span>{userData?.name}</span>
            </div>
            <div className="w-[90%] px-4 flex items-center justify-between gap-2">
                <p>{props.text}</p>
                {
                    showDeleteButton&&  <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="flex items-center gap-2"
                            >
                                <RiDeleteBin6Fill className="h-5 w-5"/>
                                Delete review
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure to delete this review
                                </DialogTitle>
                            </DialogHeader>
                            <DialogFooter className="mt-6 !flex !items-center !justify-center">
                                <DialogClose asChild>
                                    <Button
                                        className="mt-2 w-full sm:mt-0 sm:w-fit"
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    className="w-full sm:w-fit flex items-center gap-2"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    isLoading={isPending}
                                >
                                    <RiDeleteBin6Fill className="h-5 w-5"/>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        </Card>
    );
}