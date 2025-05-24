/**
 * Group Selector Component
 * Allows admins to select which group's attendance to view
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useToastContext } from '@/components/ui/toast/ToastProvider';

interface Group {
  id: number;
  grade_name: string;
  track_name: string | null;
  config_name: string;
  time_label: string;
}

interface GroupSelectorProps {
  onGroupSelect: (groupId: number, gradeName: string, trackName?: string) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ onGroupSelect }) => {
  const toast = useToastContext();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  // Fetch all groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  // Filter groups when grade or track selection changes
  useEffect(() => {
    if (groups.length === 0) return;

    let filtered = [...groups];
    
    if (selectedGrade) {
      filtered = filtered.filter(group => group.grade_name === selectedGrade);
    }
    
    if (selectedTrack) {
      filtered = filtered.filter(group => group.track_name === selectedTrack);
    }
    
    setFilteredGroups(filtered);
  }, [groups, selectedGrade, selectedTrack]);

  // Fetch all groups with their details
  const fetchGroups = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('group_days')
        .select(`
          id,
          grades:grade_id (name),
          tracks:track_id (name),
          group_configurations:group_config_id (name),
          group_times:group_time_id (time_label)
        `);
      
      if (error) throw error;
      
      if (data) {
        const formattedGroups = data.map(item => ({
          id: item.id,
          grade_name: item.grades?.name || '',
          track_name: item.tracks?.name || null,
          config_name: item.group_configurations?.name || '',
          time_label: item.group_times?.time_label || ''
        }));
        
        setGroups(formattedGroups);
        setFilteredGroups(formattedGroups);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات المجموعات');
    } finally {
      setLoading(false);
    }
  };

  // Get unique grade names
  const getUniqueGrades = () => {
    const uniqueGrades = new Set(groups.map(group => group.grade_name));
    return Array.from(uniqueGrades);
  };

  // Get unique track names for the selected grade
  const getUniqueTracksForGrade = () => {
    if (!selectedGrade) return [];
    
    const gradeGroups = groups.filter(group => group.grade_name === selectedGrade);
    const uniqueTracks = new Set(gradeGroups.map(group => group.track_name).filter(Boolean));
    return Array.from(uniqueTracks);
  };

  // Handle group selection
  const handleGroupSelect = (group: Group) => {
    onGroupSelect(group.id, group.grade_name, group.track_name || undefined);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedGrade(null);
    setSelectedTrack(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        اختر المجموعة
      </h3>
      
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الصف الدراسي
              </label>
              <select
                id="grade-select"
                value={selectedGrade || ''}
                onChange={(e) => setSelectedGrade(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">جميع الصفوف</option>
                {getUniqueGrades().map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="track-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الشعبة
              </label>
              <select
                id="track-select"
                value={selectedTrack || ''}
                onChange={(e) => setSelectedTrack(e.target.value || null)}
                disabled={!selectedGrade}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              >
                <option value="">جميع الشعب</option>
                {getUniqueTracksForGrade().map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Reset button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={resetFilters}
              className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
          
          {/* Groups list */}
          <div className="space-y-2">
            {filteredGroups.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                لا توجد مجموعات متطابقة مع الفلاتر المحددة
              </p>
            ) : (
              filteredGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handleGroupSelect(group)}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {group.grade_name} {group.track_name && `(${group.track_name})`}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {group.config_name} - {group.time_label}
                      </p>
                    </div>
                    <button
                      className="mt-2 md:mt-0 px-4 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGroupSelect(group);
                      }}
                    >
                      عرض
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupSelector;
