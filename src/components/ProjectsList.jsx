import React, { useEffect, useState } from 'react';
import CardProject from './CardProject';
import { supabase } from '../supabase';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, img, link, video_url');

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      const mappedProjects = data.map((proj) => ({
        id: proj.id,
        Title: proj.title,
        Description: proj.description,
        Img: proj.img || '/thumbnail.png',
        video_url: proj.video_url || null,  // ✅ kirim video_url
        Link: proj.link || null,            // ✅ kalau ada live demo
      }));

      console.log("PROJECT DATA:", mappedProjects); // untuk debug

      setProjects(mappedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <CardProject key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectsList;