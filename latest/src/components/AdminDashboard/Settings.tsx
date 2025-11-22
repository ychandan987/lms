import React, { useState } from 'react';
import { ChevronRight, Plus, Trash2, Edit, Users, BookOpen, Tag, Award, ShoppingCart, Zap, Shield, Download, Check,Edit2, MoreHorizontal , Upload } from 'lucide-react';
import AddUserType from './AddUserType';
import { motion, AnimatePresence } from "framer-motion";


export default function Settings() {
  const [activeTab, setActiveTab] = useState('user-types');
  const [siteName, setSiteName] = useState('bat');
  const [siteDescription, setSiteDescription] = useState('TalentLMS - Cloud based, Lean Learning Platform with an Emphasis on Usability and Easy Course Creation');
  const [domainName] = useState('bat.talentlms.com');
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onNavigateToAddUserType = () => setIsDrawerOpen(true);
  const onCloseDrawer = () => setIsDrawerOpen(false);

  const tabs = [
    { id: 'portal', label: 'Portal', icon: ChevronRight },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'user-types', label: 'User types', icon: Tag },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'gamification', label: 'Gamification', icon: Award },
    { id: 'e-commerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'import-export', label: 'Import-Export', icon: Download },
  ];

  const renderPortalContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">IDENTITY</h2>
      
      <div className="space-y-8">
        {/* Site Name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Site name
            </label>
            <p className="text-sm text-gray-600 mb-3">
              This will appear in search engine results as the title of your site.
            </p>
          </div>
          <div>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Site Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Site description
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Briefly describe what your website is about. This will appear in search engine results as the description of your site.
            </p>
          </div>
          <div>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Domain Name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Domain name
            </label>
            <p className="text-sm text-gray-600 mb-3">
              If necessary, you can change your TalentLMS domain name anytime you want.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-900">{domainName}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsersContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">USER MANAGEMENT</h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Default user type
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Select the default user type for new registrations.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Learner</option>
              <option>Instructor</option>
              <option>Administrator</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              User registration
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Allow users to register themselves on your portal.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Enable self-registration</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email verification
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Require email verification for new user accounts.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-900">Require email verification</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserTypesContent = () => {
    interface Role {
      id: string;
      name: string;
      administrator: boolean;
      instructor: boolean;
      learner: boolean;
    }

    
    const [roles] = useState<Role[]>([
      { id: "1", name: "SuperAdmin", administrator: true, instructor: true, learner: true },
      { id: "2", name: "Admin-Type", administrator: true, instructor: true, learner: true },
      { id: "3", name: "Trainer-Type", administrator: false, instructor: true, learner: true },
      { id: "4", name: "Learner-Type", administrator: false, instructor: false, learner: true },
    ]);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">USER TYPES</h2>
          <button
            onClick={onNavigateToAddUserType}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User Type
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Administrator</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Instructor</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Learner</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={role.id}
                  className={`border-b border-gray-200 transition-colors ${
                    index === 1 ? "" : "hover:bg-gray-50"
                  }`}
                  onMouseEnter={() => setHoveredRow(role.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{role.name}</td>
                  <td className="px-6 py-4">
                    {role.administrator ? <Check className="w-5 h-5" /> : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    {role.instructor ? <Check className="w-5 h-5" /> : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    {role.learner ? <Check className="w-5 h-5" /> : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    {hoveredRow === role.id && (
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Edit2 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Trash2 className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onCloseDrawer}
              />
              <motion.div
                className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 p-6 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <AddUserType onClose={onCloseDrawer} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  const renderCoursesContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">COURSE SETTINGS</h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Course completion certificate
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Enable automatic certificate generation upon course completion.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Generate certificates</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Course enrollment
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Set the default enrollment method for new courses.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Manual enrollment</option>
              <option>Self-enrollment</option>
              <option>Automatic enrollment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Course progress tracking
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Track detailed progress and time spent on courses.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Enable detailed tracking</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoriesContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">COURSE CATEGORIES</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technology</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">24</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Business</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Design</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSkillsContent = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium text-gray-900">SKILLS MANAGEMENT</h2>
    </div>

    <div className="space-y-6">
      {/* Skills Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Skills tracking
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Enable skills-based learning and progress tracking.
          </p>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked
            />
            <span className="ml-2 text-sm text-gray-900">
              Enable skills tracking
            </span>
          </label>
        </div>
      </div>

      {/* Skill Assessment Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Skill Assessment Questions
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Determine the number of questions an assessment will include,
            selected from the total available question pool.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-900">22</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
          
        </div>
      </div>

      {/* Pass Mark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Pass Mark For Assessment
          </label>
        </div>
        <div>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-900">60</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
        </div>
      </div>

      {/* Retry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Self Assessment Retry After
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Sets the waiting period before a learner can retry the assessment
            after an unsuccessful attempt.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-900">Disabled</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
        </div>
      </div>

      {/* Completion Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Self Assessment Completion Time
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Define the time limit for learners to complete a self-assessment.
            The timer begins when the assessment is started.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm text-gray-900">20</span>
              <ChevronRight className="w-2 h-2 text-gray-400" />
            </div>
        </div>
      </div>
    </div>
  </div>
);

  const renderGamificationContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">GAMIFICATION</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Points system
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Award points to users for completing activities and courses.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Enable points system</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Badges and achievements
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Create custom badges and achievements for user milestones.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Enable badges</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Leaderboards
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Display user rankings based on points and achievements.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-900">Show leaderboards</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEcommerceContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">E-COMMERCE SETTINGS</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Course sales
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Enable selling courses through your portal.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-900">Enable course sales</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Payment gateway
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Select your preferred payment processing method.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>PayPal</option>
              <option>Stripe</option>
              <option>Square</option>
              <option>Manual payment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Default currency
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Set the default currency for course pricing.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>CAD ($)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">INTEGRATIONS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Zoom</h3>
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">Z</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Virtual classroom integration</p>
          <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
            Configure
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Salesforce</h3>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">SF</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">CRM integration</p>
          <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
            Connected
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Slack</h3>
            <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Team communication</p>
          <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
            Configure
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Google SSO</h3>
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Single sign-on</p>
          <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
            Configure
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Microsoft Teams</h3>
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Video conferencing</p>
          <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
            Configure
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Zapier</h3>
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">Z</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-3">Workflow automation</p>
          <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors">
            Configure
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">SECURITY SETTINGS</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Two-factor authentication
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Require 2FA for all administrator accounts.
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-900">Require 2FA for admins</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password policy
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Set minimum requirements for user passwords.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
              <option>Medium (8+ chars, mixed case, numbers)</option>
              <option>Basic (6+ chars)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Session timeout
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Automatically log out inactive users after specified time.
            </p>
          </div>
          <div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>Never</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              IP restrictions
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Restrict access to specific IP addresses or ranges.
            </p>
          </div>
          <div>
            <textarea
              placeholder="Enter IP addresses or ranges (one per line)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderImportExportContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">IMPORT & EXPORT</h2>
      
      <div className="space-y-8">
        {/* Import Section */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Import Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Upload className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">Import Users</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Upload CSV file with user data</p>
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Upload className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">Import Courses</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Upload SCORM packages or course data</p>
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Export Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Download className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">Export Users</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Download user data as CSV</p>
              <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                Download CSV
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Download className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">Export Reports</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Download learning analytics and reports</p>
              <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                Download Reports
              </button>
            </div>
          </div>
        </div>

        {/* Backup Section */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Backup & Restore</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Automatic backups
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Schedule regular backups of your portal data.
                </p>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-900">Enable automatic backups</span>
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portal':
        return renderPortalContent();
      case 'users':
        return renderUsersContent();
      case 'user-types':
        return renderUserTypesContent();
      case 'courses':
        return renderCoursesContent();
      case 'categories':
        return renderCategoriesContent();
      case 'skills':
        return renderSkillsContent();
      case 'gamification':
        return renderGamificationContent();
      case 'e-commerce':
        return renderEcommerceContent();
      case 'integrations':
        return renderIntegrationsContent();
      case 'security':
        return renderSecurityContent();
      case 'import-export':
        return renderImportExportContent();
      default:
        return renderPortalContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="  border-gray-500 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">Account & Settings</h1>
      </div>

      {/* Navigation Tabs */}
      <div className=" border-b border-gray-500">
        <div className="px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
              
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {renderTabContent()}

          {/* Action Buttons */}
          
        </div>
      </div>
    </div>
  );
}