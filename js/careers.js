// Careers Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample jobs data (in production, this would come from a backend/database)
    let jobsData = [
        {
            id: 1,
            title: 'Video Editor',
            titleEn: 'Video Editor',
            titleVi: 'Biên Tập Viên Video',
            category: 'video',
            location: 'Vinh, Nghệ An',
            type: 'fulltime',
            typeVi: 'Toàn thời gian',
            typeEn: 'Full-time',
            salary: '10-15 triệu VNĐ',
            description: 'Chúng tôi đang tìm kiếm một Video Editor có kinh nghiệm để tham gia đội ngũ sản xuất nội dung của chúng tôi.',
            descriptionEn: 'We are looking for an experienced Video Editor to join our content production team.',
            requirements: '- 1+ năm kinh nghiệm biên tập video\n- Thành thạo Adobe Premiere Pro, After Effects\n- Có kỹ năng storytelling tốt\n- Sáng tạo và chủ động',
            requirementsEn: '- 1+ years video editing experience\n- Proficient in Adobe Premiere Pro, After Effects\n- Good storytelling skills\n- Creative and proactive',
            postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: 2,
            title: 'Content Creator',
            titleEn: 'Content Creator',
            titleVi: 'Người Sáng Tạo Nội Dung',
            category: 'content',
            location: 'Vinh, Nghệ An',
            type: 'fulltime',
            typeVi: 'Toàn thời gian',
            typeEn: 'Full-time',
            salary: '8-12 triệu VNĐ',
            description: 'Tìm kiếm Content Creator đam mê tạo nội dung cho các nền tảng YouTube, TikTok, Facebook.',
            descriptionEn: 'Looking for a passionate Content Creator for YouTube, TikTok, and Facebook platforms.',
            requirements: '- Có kinh nghiệm làm content trên mạng xã hội\n- Kỹ năng viết kịch bản, quay dựng cơ bản\n- Am hiểu xu hướng và các nền tảng digital\n- Nhiệt huyết và yêu thích sáng tạo',
            requirementsEn: '- Experience in social media content creation\n- Basic scripting and filming skills\n- Understanding of trends and digital platforms\n- Passionate and creative',
            postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            id: 3,
            title: 'Marketing Executive',
            titleEn: 'Marketing Executive',
            titleVi: 'Nhân Viên Marketing',
            category: 'marketing',
            location: 'Vinh, Nghệ An',
            type: 'fulltime',
            typeVi: 'Toàn thời gian',
            typeEn: 'Full-time',
            salary: '9-14 triệu VNĐ',
            description: 'Cần tuyển Marketing Executive để phát triển chiến lược marketing và quảng bá thương hiệu.',
            descriptionEn: 'Hiring Marketing Executive to develop marketing strategies and brand promotion.',
            requirements: '- Tốt nghiệp chuyên ngành Marketing hoặc liên quan\n- 1+ năm kinh nghiệm trong lĩnh vực digital marketing\n- Am hiểu Facebook Ads, Google Ads\n- Kỹ năng phân tích và lập kế hoạch tốt',
            requirementsEn: '- Degree in Marketing or related field\n- 1+ years experience in digital marketing\n- Familiar with Facebook Ads, Google Ads\n- Good analytical and planning skills',
            postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
            id: 4,
            title: 'Graphic Designer',
            titleEn: 'Graphic Designer',
            titleVi: 'Thiết Kế Đồ Họa',
            category: 'content',
            location: 'Vinh, Nghệ An',
            type: 'parttime',
            typeVi: 'Bán thời gian',
            typeEn: 'Part-time',
            salary: 'Thỏa thuận',
            description: 'Tuyển Graphic Designer bán thời gian cho các dự án thiết kế thumbnail, poster, banner.',
            descriptionEn: 'Hiring part-time Graphic Designer for thumbnail, poster, and banner design projects.',
            requirements: '- Thành thạo Photoshop, Illustrator\n- Có portfolio thiết kế ấn tượng\n- Có khả năng làm việc độc lập\n- Sáng tạo và đáp ứng deadline',
            requirementsEn: '- Proficient in Photoshop, Illustrator\n- Impressive design portfolio\n- Able to work independently\n- Creative and deadline-oriented',
            postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
    ];
    
    // Get current language
    let currentLang = localStorage.getItem('language') || 'vi';
    
    // Modal elements
    const jobPostModal = document.getElementById('jobPostModal');
    const applyModal = document.getElementById('applyModal');
    const postJobBtn = document.getElementById('postJobBtn');
    const closeJobPost = document.getElementById('closeJobPost');
    const closeApply = document.getElementById('closeApply');
    const jobPostForm = document.getElementById('jobPostForm');
    const applyForm = document.getElementById('applyForm');
    const jobsList = document.getElementById('jobsList');
    
    // Open/Close modals
    postJobBtn.addEventListener('click', () => {
        jobPostModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeJobPost.addEventListener('click', () => {
        jobPostModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    closeApply.addEventListener('click', () => {
        applyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === jobPostModal) {
            jobPostModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === applyModal) {
            applyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Render jobs list
    function renderJobs(filter = 'all') {
        const filteredJobs = filter === 'all' 
            ? jobsData 
            : jobsData.filter(job => job.category === filter);
        
        if (filteredJobs.length === 0) {
            jobsList.innerHTML = `
                <div class="no-jobs">
                    <i class="fas fa-briefcase"></i>
                    <p data-en="No positions available in this category" data-vi="Chưa có vị trí tuyển dụng trong danh mục này">
                        ${currentLang === 'vi' ? 'Chưa có vị trí tuyển dụng trong danh mục này' : 'No positions available in this category'}
                    </p>
                </div>
            `;
            return;
        }
        
        jobsList.innerHTML = filteredJobs.map(job => {
            const title = currentLang === 'vi' ? job.titleVi : job.titleEn;
            const type = currentLang === 'vi' ? job.typeVi : job.typeEn;
            const description = currentLang === 'vi' ? job.description : job.descriptionEn;
            const daysAgo = Math.floor((Date.now() - job.postedDate) / (1000 * 60 * 60 * 24));
            const postedText = currentLang === 'vi' ? `${daysAgo} ngày trước` : `${daysAgo} days ago`;
            
            return `
                <div class="job-card" data-job-id="${job.id}">
                    <div class="job-header">
                        <div class="job-info">
                            <h3 class="job-title">${title}</h3>
                            <div class="job-meta">
                                <span class="job-type"><i class="fas fa-briefcase"></i> ${type}</span>
                                <span class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                                <span class="job-salary"><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                            </div>
                        </div>
                        <span class="job-posted">${postedText}</span>
                    </div>
                    <div class="job-description">
                        <p>${description}</p>
                    </div>
                    <div class="job-footer">
                        <button class="btn btn-secondary view-details" data-job-id="${job.id}">
                            <i class="fas fa-info-circle"></i>
                            <span data-en="View Details" data-vi="Chi Tiết">${currentLang === 'vi' ? 'Chi Tiết' : 'View Details'}</span>
                        </button>
                        <button class="btn btn-primary apply-now" data-job-id="${job.id}">
                            <i class="fas fa-paper-plane"></i>
                            <span data-en="Apply Now" data-vi="Ứng Tuyển Ngay">${currentLang === 'vi' ? 'Ứng Tuyển Ngay' : 'Apply Now'}</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click events to apply buttons
        document.querySelectorAll('.apply-now').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.dataset.jobId);
                openApplyModal(jobId);
            });
        });
        
        // Add click events to view details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.dataset.jobId);
                showJobDetails(jobId);
            });
        });
    }
    
    // Filter jobs
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            renderJobs(filter);
        });
    });
    
    // Show job details
    function showJobDetails(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        const title = currentLang === 'vi' ? job.titleVi : job.titleEn;
        const type = currentLang === 'vi' ? job.typeVi : job.typeEn;
        const description = currentLang === 'vi' ? job.description : job.descriptionEn;
        const requirements = currentLang === 'vi' ? job.requirements : job.requirementsEn;
        
        // Create a custom alert/modal with job details
        const detailsHTML = `
            <div class="job-details-modal">
                <div class="job-details-content">
                    <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                    <h2>${title}</h2>
                    <div class="job-meta">
                        <span><i class="fas fa-briefcase"></i> ${type}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                    </div>
                    <div class="job-section">
                        <h3>${currentLang === 'vi' ? 'Mô tả công việc' : 'Job Description'}</h3>
                        <p>${description}</p>
                    </div>
                    <div class="job-section">
                        <h3>${currentLang === 'vi' ? 'Yêu cầu' : 'Requirements'}</h3>
                        <pre>${requirements}</pre>
                    </div>
                    <button class="btn btn-primary" onclick="document.querySelector('[data-job-id=\\'${jobId}\\'].apply-now').click(); this.parentElement.parentElement.remove();">
                        <i class="fas fa-paper-plane"></i>
                        <span>${currentLang === 'vi' ? 'Ứng Tuyển Ngay' : 'Apply Now'}</span>
                    </button>
                </div>
            </div>
        `;
        
        const detailsModal = document.createElement('div');
        detailsModal.className = 'modal';
        detailsModal.style.display = 'flex';
        detailsModal.innerHTML = detailsHTML;
        document.body.appendChild(detailsModal);
        document.body.style.overflow = 'hidden';
        
        detailsModal.addEventListener('click', function(e) {
            if (e.target === detailsModal) {
                detailsModal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Open apply modal
    function openApplyModal(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        const title = currentLang === 'vi' ? job.titleVi : job.titleEn;
        document.querySelector('.apply-job-title').innerHTML = `
            <p style="text-align: center; color: var(--gray); margin-bottom: 1rem;">
                ${currentLang === 'vi' ? 'Vị trí:' : 'Position:'} <strong>${title}</strong>
            </p>
        `;
        
        applyForm.dataset.jobId = jobId;
        applyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Handle job post form submission
    jobPostForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const newJob = {
            id: jobsData.length + 1,
            title: formData.get('title'),
            titleEn: formData.get('title'),
            titleVi: formData.get('title'),
            category: formData.get('category'),
            location: formData.get('location'),
            type: formData.get('type'),
            typeVi: getTypeLabel(formData.get('type'), 'vi'),
            typeEn: getTypeLabel(formData.get('type'), 'en'),
            salary: formData.get('salary') || 'Thỏa thuận',
            description: formData.get('description'),
            descriptionEn: formData.get('description'),
            requirements: formData.get('requirements'),
            requirementsEn: formData.get('requirements'),
            postedDate: new Date()
        };
        
        jobsData.unshift(newJob);
        renderJobs();
        
        // Show success message
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = currentLang === 'vi' ? 'Đã đăng!' : 'Posted!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            jobPostModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.reset();
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = '';
        }, 1500);
    });
    
    // Handle apply form submission
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const jobId = this.dataset.jobId;
        const formData = new FormData(this);
        
        // In production, send this to backend
        const application = {
            jobId: jobId,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            coverLetter: formData.get('coverLetter'),
            cv: formData.get('cv').name,
            appliedDate: new Date()
        };
        
        console.log('Application submitted:', application);
        
        // Show success message
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = currentLang === 'vi' ? 'Đã gửi!' : 'Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            applyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.reset();
            document.querySelector('.file-name').textContent = '';
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = '';
            
            // Show thank you alert
            alert(currentLang === 'vi' 
                ? 'Cảm ơn bạn đã ứng tuyển! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.' 
                : 'Thank you for your application! We will contact you soon.');
        }, 1500);
    });
    
    // File upload handling
    const fileInput = document.getElementById('applicantCV');
    const fileLabel = document.querySelector('.file-label');
    const fileName = document.querySelector('.file-name');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileName.textContent = this.files[0].name;
            fileLabel.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else {
            fileName.textContent = '';
            fileLabel.style.background = '';
        }
    });
    
    // Helper function to get type label
    function getTypeLabel(type, lang) {
        const labels = {
            fulltime: { vi: 'Toàn thời gian', en: 'Full-time' },
            parttime: { vi: 'Bán thời gian', en: 'Part-time' },
            contract: { vi: 'Hợp đồng', en: 'Contract' },
            intern: { vi: 'Thực tập', en: 'Internship' }
        };
        return labels[type] ? labels[type][lang] : type;
    }
    
    // Initial render
    renderJobs();
});
