'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { FaUser, FaUserFriends, FaEnvelope, FaSpinner, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { z } from 'zod';
import Link from 'next/link';

// Validation schema for adding a partner
const addPartnerSchema = z.object({
  email: z.string().email("Invalid email address"),
  relationshipType: z.enum(["friend", "partner"])
});

interface Relationship {
  id: number;
  relationship_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  related_user_id: number;
  related_user_name: string;
  related_user_email: string;
}

export default function PartnersPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [relationshipType, setRelationshipType] = useState<'friend' | 'partner'>('friend');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sentRelationships, setSentRelationships] = useState<Relationship[]>([]);
  const [receivedRelationships, setReceivedRelationships] = useState<Relationship[]>([]);
  
  // Fetch relationships data
  const fetchRelationships = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/relationships');
      
      if (!response.ok) {
        throw new Error('Failed to fetch relationships');
      }
      
      const data = await response.json();
      
      setSentRelationships(data.sent || []);
      setReceivedRelationships(data.received || []);
    } catch (error) {
      console.error('Error fetching relationships:', error);
      setError('Failed to load partners. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);
  
  useEffect(() => {
    fetchRelationships();
  }, [fetchRelationships]);
  
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSending(true);
      setError('');
      setSuccess('');
      
      // Validate form data
      const validationResult = addPartnerSchema.safeParse({
        email,
        relationshipType
      });
      
      if (!validationResult.success) {
        const errorMsg = Object.values(validationResult.error.flatten().fieldErrors)
          .flat()
          .join(', ');
        setError(errorMsg);
        return;
      }
      
      const response = await fetch('/api/relationships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          relationshipType
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add partner');
      }
      
      // Clear form and show success message
      setEmail('');
      setSuccess('Partner request sent successfully!');
      
      // Refresh the relationships list
      fetchRelationships();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error: any) {
      console.error('Error adding partner:', error);
      setError(error.message || 'Failed to add partner. Please try again.');
    } finally {
      setIsSending(false);
    }
  };
  
  const handleAcceptReject = async (id: number, status: 'accepted' | 'rejected') => {
    try {
      setError('');
      
      const response = await fetch('/api/relationships', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relationshipId: id,
          status
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${status} request`);
      }
      
      // Refresh the relationships list
      fetchRelationships();
      
      // Show success message
      setSuccess(`Request ${status} successfully!`);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error: any) {
      console.error(`Error ${status} request:`, error);
      setError(error.message || `Failed to ${status} request. Please try again.`);
    }
  };
  
  const handleDelete = async (id: number) => {
    try {
      setError('');
      
      const response = await fetch(`/api/relationships?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove partner');
      }
      
      // Refresh the relationships list
      fetchRelationships();
      
      // Show success message
      setSuccess('Partner removed successfully!');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error: any) {
      console.error('Error removing partner:', error);
      setError(error.message || 'Failed to remove partner. Please try again.');
    }
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Partners & Friends</h1>
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
          >
            {success}
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {error}
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Partner Form */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaUserFriends className="mr-2 text-primary" />
              Add Partner
            </h2>
            
            <form onSubmit={handleAddPartner}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Partner's Email
                </label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <span className="bg-gray-100 p-2 text-gray-500 border-r">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 p-2 outline-none"
                    placeholder="partner@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship Type
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="friend"
                      checked={relationshipType === 'friend'}
                      onChange={() => setRelationshipType('friend')}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="ml-2">Friend</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="partner"
                      checked={relationshipType === 'partner'}
                      onChange={() => setRelationshipType('partner')}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="ml-2">Partner</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </form>
          </div>
          
          {/* Partner Requests Section */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Partner Requests</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <FaSpinner className="animate-spin text-primary text-xl mr-3" />
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <>
                {receivedRelationships.length === 0 ? (
                  <p className="text-gray-500 italic py-4">No pending requests</p>
                ) : (
                  <div className="divide-y">
                    {receivedRelationships.map(relationship => (
                      <div key={relationship.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-3 sm:mb-0">
                          <div className="font-medium">{relationship.related_user_name}</div>
                          <div className="text-sm text-gray-500">{relationship.related_user_email}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Request type: <span className="capitalize">{relationship.relationship_type}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {relationship.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleAcceptReject(relationship.id, 'accepted')}
                                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors text-sm flex items-center"
                              >
                                <FaCheck className="mr-1" /> Accept
                              </button>
                              <button
                                onClick={() => handleAcceptReject(relationship.id, 'rejected')}
                                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors text-sm flex items-center"
                              >
                                <FaTimes className="mr-1" /> Reject
                              </button>
                            </>
                          ) : (
                            <span className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800 capitalize">
                              {relationship.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Current Partners Section */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Your Partners & Friends</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <FaSpinner className="animate-spin text-primary text-xl mr-3" />
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <>
                {sentRelationships.filter(r => r.status === 'accepted').length === 0 &&
                 receivedRelationships.filter(r => r.status === 'accepted').length === 0 ? (
                  <p className="text-gray-500 italic py-4">You don't have any partners or friends yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Active sent relationships */}
                    {sentRelationships
                      .filter(r => r.status === 'accepted')
                      .map(relationship => (
                        <div key={relationship.id} className="border rounded-lg p-4 relative">
                          <button
                            onClick={() => handleDelete(relationship.id)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            title="Remove partner"
                          >
                            <FaTrash size={14} />
                          </button>
                          
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-3">
                              <FaUser />
                            </div>
                            <div>
                              <div className="font-medium">{relationship.related_user_name}</div>
                              <div className="text-xs text-gray-500">{relationship.related_user_email}</div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 mb-3">
                            <span className="capitalize">{relationship.relationship_type}</span> · 
                            Since {new Date(relationship.updated_at).toLocaleDateString()}
                          </div>
                          
                          <Link href={`/partners/${relationship.related_user_id}`} 
                            className="block text-center bg-primary text-white py-1 px-3 rounded-md hover:bg-primary-dark transition-colors text-sm">
                            View Progress
                          </Link>
                        </div>
                      ))}
                    
                    {/* Active received relationships */}
                    {receivedRelationships
                      .filter(r => r.status === 'accepted')
                      .map(relationship => (
                        <div key={relationship.id} className="border rounded-lg p-4 relative">
                          <button
                            onClick={() => handleDelete(relationship.id)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            title="Remove partner"
                          >
                            <FaTrash size={14} />
                          </button>
                          
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-3">
                              <FaUser />
                            </div>
                            <div>
                              <div className="font-medium">{relationship.related_user_name}</div>
                              <div className="text-xs text-gray-500">{relationship.related_user_email}</div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 mb-3">
                            <span className="capitalize">{relationship.relationship_type}</span> · 
                            Since {new Date(relationship.updated_at).toLocaleDateString()}
                          </div>
                          
                          <Link href={`/partners/${relationship.related_user_id}`} 
                            className="block text-center bg-primary text-white py-1 px-3 rounded-md hover:bg-primary-dark transition-colors text-sm">
                            View Progress
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
                
                {/* Pending sent relationships */}
                {sentRelationships.filter(r => r.status === 'pending').length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Pending Sent Requests</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sentRelationships
                        .filter(r => r.status === 'pending')
                        .map(relationship => (
                          <div key={relationship.id} className="border rounded-lg p-4 relative bg-gray-50">
                            <button
                              onClick={() => handleDelete(relationship.id)}
                              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                              title="Cancel request"
                            >
                              <FaTrash size={14} />
                            </button>
                            
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-3">
                                <FaUser />
                              </div>
                              <div>
                                <div className="font-medium">{relationship.related_user_name}</div>
                                <div className="text-xs text-gray-500">{relationship.related_user_email}</div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-3">
                              <span className="capitalize">{relationship.relationship_type}</span> · 
                              Pending since {new Date(relationship.created_at).toLocaleDateString()}
                            </div>
                            
                            <div className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded inline-block">
                              Awaiting response
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 