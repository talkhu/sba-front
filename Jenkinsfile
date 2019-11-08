pipeline {
    agent any
    environment {

	  	GIT_URL = "https://github.com/talkhu/sba-front.git"
		GIT_CRED = "b6514644-84fc-410a-9ee0-7b3002b7c931"
		dockerImage = ''

    }
    stages {

    	stage('CheckOut Code'){
         	steps{
            	checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: GIT_CRED, url: GIT_URL]]])
            	}
              }
        stage('Angular Build'){
        	steps{
			  bat 'npm install -g @angular/cli'
              bat 'npm install'
        	  bat 'ng build --prod'
        	}

        }

       stage('Building image') {
	      steps{
		        script {
		        bat 'docker build -t sbafront:build1 .'
		        bat 'docker run -d --name front -p 4200:4200 sbafront:build1'
	        }
	      }
	    }

		
   }


}
