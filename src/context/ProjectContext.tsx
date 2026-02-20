import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ProjectType = 'Landing Page' | 'Boutique Sites' | 'Aplicaciones' | 'Otro';

interface ProjectContextType {
    selectedProject: ProjectType;
    setSelectedProject: (project: ProjectType) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState<ProjectType>('Landing Page');

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};
