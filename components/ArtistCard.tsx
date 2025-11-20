/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] w-full overflow-hidden border border-white/10 bg-[#282828] cursor-pointer rounded-xl"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom - Uses the first image as thumbnail */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={project.images[0]} 
          alt={project.title} 
          className="h-full w-full object-cover will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.8 },
            hover: { scale: 1.05, opacity: 1 }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-bold uppercase tracking-widest bg-[#6BCB77] text-black px-3 py-1 rounded-full">
             {project.category}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-white text-black rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <motion.p 
            className="text-sm font-medium uppercase tracking-widest text-[#6BCB77] mb-2"
            variants={{
              rest: { opacity: 0.7, y: 0 },
              hover: { opacity: 1, y: 0 }
            }}
          >
            {project.client} • {project.year}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;