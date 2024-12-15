import React, { useState, useEffect } from 'react';
import TextInput from '../components/ui/TextInput';
import { Button } from '../components/ui/button';
import UserSidepanel from '@/components/ui/UserSidepanel';
import ComboBox from '../components/ui/combobox';
import { submitProposal } from '../apis/user.api';
import { viewProjectThemes, Theme } from "../apis/admin.api";

import { useUser } from '@/hooks/useUser';

const SubmitProposal: React.FC = () => {
  const [proposalTitle, setProposalTitle] = useState('');
  const [projectTheme, setProjectTheme] = useState<{ name: string, id: number }>({ name: '', id: 0 });
  const [proposalText, setProposalText] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUser();
  const [data, setData] = useState<Theme[]>([]);

  // Fetch themes when the component is mounted
  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const themes = await viewProjectThemes();
        setData(themes);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleSubmit = async (e: React.FormEvent, userId: number) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {

      const result = await submitProposal(
        userId,
        projectTheme.id,  
        proposalTitle,
        proposalText
      );

      if (result) {
        setSuccessMessage('Proposal submitted successfully!');
      } else {
        setErrorMessage('Failed to submit the proposal. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setErrorMessage('An error occurred while submitting the proposal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-end items-center">
      {/* Side Panel */}
      <div className="w-[510px]">
        <UserSidepanel />
      </div>

      {/* Main Content */}
      <main className="w-[70%] bg-gray-50 h-[100%]">
        <div className="max-w-full mx-auto p-8 rounded-md">
          <h2 className="text-2xl font-bold text-[#033469] mb-6">Submit Proposal</h2>

          <form onSubmit={(e) => handleSubmit(e, user!.id!)}>
            {/* Input Row */}
            <div>
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
                  value={projectTheme.name} 
                  onChange={(e) => {
                    const selectedTheme = data.find(theme => theme.Name === e.target.value);
                    if (selectedTheme) {
                      setProjectTheme({ name: selectedTheme.Name, id: selectedTheme.ThemeId });
                    }
                  }}
                  options={data.map(theme => theme.Name)} 
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
              <Button
                className="w-md mt-4"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>

              <Button
                className="w-md mt-4 border border-blue-800 text-blue-800 bg-white hover:bg-[#033469] hover:text-white"
                size="lg"
                type="button"
              >
                Cancel
              </Button>
            </div>

            {/* Feedback Messages */}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitProposal;
