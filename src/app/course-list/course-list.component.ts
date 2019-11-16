import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../service/course.service';
import { AlertService } from '../service/alert.service';
import { MentorCourse } from '../models/mentorCourse';
import { NewCourse } from '../models/newCourse';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  mentorname: string;
  showMentorCourse: boolean;
  showAvailableMentorCourse: boolean;
  showDisableMentorCourse: boolean;
  showCompletedMentorCourse: boolean;
  mentorcourses: MentorCourse[];
  mentoravailablecourses: MentorCourse[];
  mentorcompletedcourses: MentorCourse[];
  mentordisablecourses: MentorCourse[];
  @Input() searchText: string;

  constructor(private courseservice: CourseService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.mentorname = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getMentorCourse();
  }

  getMentorCourse() {
    this.showMentorCourse = true;

    this.courseservice.findMentorCourses(1, this.mentorname).subscribe(data => {

        // tslint:disable-next-line:no-string-literal
        if (data['code'] === 200) {
        // tslint:disable-next-line:no-string-literal
        this.mentorcourses = data['data'];
        this.showMentorCourse = false;
      // tslint:disable-next-line:no-string-literal
      } else if (data['code'] === 404) {
        // tslint:disable-next-line:no-string-literal
        this.showMentorCourse = false;
        // tslint:disable-next-line:no-string-literal
        this.alertService.warn(data['message']);
      }

    },
    error => {
      this.alertService.error(error);
      this.showMentorCourse = false;
          });
    }

    getCoursesMentor() {
      this.showAvailableMentorCourse = true;
      this.courseservice.findMentorAvailableCourses(this.mentorname).subscribe(data => {
          // tslint:disable-next-line:no-string-literal
          if (data['code'] === 200) {
          // tslint:disable-next-line:no-string-literal
          this.mentoravailablecourses = data['data'];
          this.showAvailableMentorCourse = false;
        // tslint:disable-next-line:no-string-literal
        } else if (data['code'] === 404) {
          // tslint:disable-next-line:no-string-literal
          this.showAvailableMentorCourse = false;
          // tslint:disable-next-line:no-string-literal
          this.alertService.warn(data['message']);
        }
      },
      error => {
        this.alertService.error(error);
        this.showAvailableMentorCourse = false;
            });
      }

      getDisabledCoursesMentor() {
        this.showDisableMentorCourse = true;
        this.courseservice.findMentorDisabledCourses(this.mentorname).subscribe(data => {
          // tslint:disable-next-line:no-string-literal
          if (data['code'] === 200) {
          // tslint:disable-next-line:no-string-literal
          this.mentordisablecourses = data['data'];
          this.showDisableMentorCourse = false;
        // tslint:disable-next-line:no-string-literal
        } else if (data['code'] === 404) {
          // tslint:disable-next-line:no-string-literal
          this.showDisableMentorCourse = false;
          // tslint:disable-next-line:no-string-literal
          this.alertService.warn(data['message']);
        }
      },
      error => {
        this.alertService.error(error);
        this.showDisableMentorCourse = false;
            });

      }

      getCompletedCoursesMentor() {
        this.showCompletedMentorCourse = true;
        this.courseservice.findMentorCompletedCourses(this.mentorname).subscribe(data => {
            // tslint:disable-next-line:no-string-literal
            if (data['code'] === 200) {
            // tslint:disable-next-line:no-string-literal
            this.mentorcompletedcourses = data['data'];
            this.showCompletedMentorCourse = false;
          // tslint:disable-next-line:no-string-literal
          } else if (data['code'] === 404) {
            // tslint:disable-next-line:no-string-literal
            this.showCompletedMentorCourse = false;
            // tslint:disable-next-line:no-string-literal
            this.alertService.warn(data['message']);
          }
        },
        error => {
          this.alertService.error(error);
          this.showCompletedMentorCourse = false;
              });
        }

        disableCourses(searchText) {
          this.alertService.clear();
          this.showAvailableMentorCourse = true;
          if (searchText == null) {
            this.alertService.error("please input course name !");
            this.showAvailableMentorCourse = false;
            return 1
          }
          const course: NewCourse = {
            name : searchText,
             description : '',
             skill: '',
             startDate: '',
             endDate: '',
             mentorName: this.mentorname,
             fee: 0
          };

          this.courseservice.disableSearchCourses(course).subscribe(data => {
              // tslint:disable-next-line:no-string-literal
              if (data['code'] === 200) {
              // tslint:disable-next-line:no-string-literal
              this.mentoravailablecourses = []
              this.alertService.success('Disabled Success !')
              this.getCoursesMentor()
            // tslint:disable-next-line:no-string-literal
            } else if (data['code'] === 404) {
              // tslint:disable-next-line:no-string-literal
              this.showAvailableMentorCourse = false;
              // tslint:disable-next-line:no-string-literal
              this.alertService.warn(data['message']);
            }
          },
          error => {
            this.alertService.error(error);
            this.showAvailableMentorCourse = false;
                });
          }

          enableCourses(searchText) {
            this.alertService.clear();
            this.showAvailableMentorCourse = true;
            if (searchText == null) {
              this.alertService.error("please input course name !");
              return 1
            }

            const course: NewCourse = {
              name : searchText,
               description : '',
               skill: '',
               startDate: '',
               endDate: '',
               mentorName: this.mentorname,
               fee: 0
            };

            this.courseservice.enableSearchCourses(course).subscribe(data => {
                // tslint:disable-next-line:no-string-literal
                if (data['code'] === 200) {
                // tslint:disable-next-line:no-string-literal
                this.mentordisablecourses = []
                this.alertService.success('Disabled Success !')
                this.getDisabledCoursesMentor()
              // tslint:disable-next-line:no-string-literal
              } else if (data['code'] === 404) {
                // tslint:disable-next-line:no-string-literal
                this.showAvailableMentorCourse = false;
                // tslint:disable-next-line:no-string-literal
                this.alertService.warn(data['message']);
              }
            },
            error => {
              this.alertService.error(error);
              this.showAvailableMentorCourse = false;
                  });
            }
        
  selectCourseClick(tab) {
    switch(tab.index) {
      case 0:
        this.getMentorCourse();
        break;
      case 1:
        this.getCompletedCoursesMentor(); 
        break;
      case 2:
        this.getCoursesMentor();
        break;
      case 3:
        this.getDisabledCoursesMentor();
        break;
    }

  }

  getStatusColor(status: string) {
    console.log("status " + status)
    switch (status) {
      case 'expired':
        return 'gray';
      case 'available':
        return 'chartreuse';
      case 'booked':
        return 'lightblue';
      case 'progress':
        return 'bisque';
      case 'completed':
        return 'blueviolet';
      case 'disable':
        return 'red'
    }
}
}
