export function ErrorNotification({ message }: { message: string }) {
    return (
        <div className=" mt-5 top-4 right-4 z-50 rounded-lg bg-red-100 p-4 shadow-md">
            <p className="text-sm text-red-700">{message}</p>
        </div>
    );
}
