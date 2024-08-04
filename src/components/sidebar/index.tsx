import { Link } from "@mui/material";
import { PATH } from "@/config/path";
import Divider from '@mui/material/Divider';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import ExploreIcon from '@mui/icons-material/Explore';
import clsx from "clsx";
import PetsIcon from '@mui/icons-material/Pets';
import HistoryIcon from '@mui/icons-material/History';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

function signOut() {
    // TODO
}

const Sidebar = ({ className }: { className?: string }) => {
    return (
        <div className={clsx("flex flex-col top-0 left-0 bg-white h-full", className)}>
            <div className="flex items-center justify-center h-14 border-b gap-2">
                <Link href={PATH.HOME} underline="none" color="inherit" className="relative flex gap-2 flex-row items-center h-11 focus:outline-none pr-6">
                    <PetsIcon />
                    <div>
                        Meoracle
                    </div>
                </Link>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                    <li>
                        <Link href={PATH.CHOICE_PREDICT} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <ExploreIcon />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Choice Predict</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={PATH.IMAGE_PREDICT} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <ImageSearchIcon />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Image Predict</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={PATH.NLP_PREDICT} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <MarkChatReadIcon />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">NLP Predict</span>
                        </Link>
                    </li>
                    <Divider />
                    <li>
                        <Link href={PATH.PREDICT_HISTORY} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <HistoryIcon />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Predict History</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={PATH.APPOINTMENTS} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <NoteAltIcon />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Appointments</span>
                        </Link>
                    </li>
                    <Divider />
                    <li>
                        <Link href={PATH.ACCOUNT} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Account</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={PATH.SETTINGS} underline="none" color="inherit" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" onClick={() => {
                            signOut();
                        }} underline="none" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4 text-red-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate text-red-500">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
