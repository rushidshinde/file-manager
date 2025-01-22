export default function getFileUploadDate( date: number) {
   return new Date(date).toLocaleDateString();
}