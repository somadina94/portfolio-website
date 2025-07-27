export default function ContactEmailTemplate({
  name,
  email,
  message,
  subject,
}: {
  name: string;
  email: string;
  message: string;
  subject: string;
}) {
  return (
    <div className=" p-4 rounded-md bg-primary">
      <div className="space-y-2 border border-border rounded-md p-4">
        <h1 className="text-lg font-bold">Email from portfolio</h1>
        <p className="text-sm text-gray-500 p-4">Name: {name}</p>
        <p className="text-sm text-gray-500 p-4">Email: {email}</p>
        <p className="text-sm text-gray-500 p-4">Message: {message}</p>
        <p className="text-sm text-gray-500 p-4">Subject: {subject}</p>
      </div>
    </div>
  );
}
