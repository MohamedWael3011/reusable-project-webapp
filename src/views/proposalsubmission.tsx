import React, { useState } from 'react';
import TextInput from '../components/ui/TextInput';
import { Button } from '../components/ui/button';
import UserSidepanel from '@/components/ui/UserSidepanel';
import ComboBox from '../components/ui/combobox';


const SubmitProposal: React.FC = () => {
  const [proposalTitle, setProposalTitle] = useState('');
  const [projectTheme, setProjectTheme] = useState('');
  const [proposalText, setProposalText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ proposalTitle, projectTheme, proposalText });
    // Add your submission logic here
  };

  return (

    <div className="min-h-screen flex justify-end items-center"> {/* Flex container, aligned to the right */}
      {/* Side Panel */}
      <div className="w-[510px]">
        {/* <SideMenu /> */}
        <UserSidepanel />
      </div>

      {/* Main Content */}
      <main className="w-[70%] bg-gray-50 h-[100%]"> {/* 50% width and full height */}
        <div className="max-w-full mx-auto p-8 rounded-md">
          <h2 className="text-2xl font-bold text-[#033469] mb-6">Submit Proposal</h2>

          <form onSubmit={handleSubmit}>
            {/* All Components in form */}
            <div className="">
              {/* Input Row */}
              <div className="flex space-x-2 ">
                {/* Proposal Title */}
                <div className="flex-1 p-4 rounded-xl">
                  <TextInput
                    label="Proposal Title"
                    placeholder="Enter Title"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    required={true}
                  />
                </div>

                {/* Project Theme (Combo Box) */}
                <div className="flex-1 p-4 rounded-xl">
                  <ComboBox
                    label="Project Theme"
                    value={projectTheme}
                    onChange={(e) => setProjectTheme(e.target.value)}
                    options={["Reusable", "Maintenance", "Agile", "Managment"]}
                    required={true}
                    placeholder="Choose Theme"
                  />
                </div>
              </div>

              {/* Proposal Text */}
              <div className="mb-4">
                <label className="block text-primary text-sm font-medium mb-1">Enter Your Proposal</label>
                <textarea
                  placeholder="Enter Your Proposal"
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  required
                  className="w-full h-[150px] px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500 text-black bg-blue-100"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-48">

                <Button className="w-md mt-4" size={"lg"} type='submit'>
                  Submit
                </Button>

                <Button className="w-md mt-4 border border-blue-800 text-blue-800 bg-white hover:bg-[#033469] hover:text-white "
                  size={"lg"} type='button'>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitProposal;
