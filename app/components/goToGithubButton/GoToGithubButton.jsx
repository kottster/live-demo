import { GitHub } from 'react-feather';

export function GoToGithubButton({ link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className="border p-2 py-1 rounded-md text-xs text-gray-600 cursor-pointer hover:bg-gray-100 flex gap-2 items-center">
        <GitHub size="0.8rem" />
        <span>Open cource code</span>
      </div>
    </a>
  );
}
